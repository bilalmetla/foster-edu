import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Feedback} from '../models';
import {FeedbackRepository, CustomersRepository} from '../repositories';
import {secured, SecuredType} from '../auth';
import fs from 'fs';
import util from 'util';
const writeFilePromise = util.promisify(fs.writeFile)
import path from 'path';


export class FeedbackController {
  constructor(
    @repository(FeedbackRepository)
    public feedbackRepository : FeedbackRepository,

    @repository(CustomersRepository)
    public customersRepository : CustomersRepository,
    
  ) {}

  //@secured(SecuredType.IS_AUTHENTICATED)
  @post('/feedbacks', {
    responses: {
      '200': {
        description: 'Feedback model instance',
        content: {'application/json': {schema: getModelSchemaRef(Feedback)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Feedback, {
            title: 'NewFeedback',
            exclude: ['id'],
          }),
        },
      },
    })
    feedback: Omit<Feedback, 'id'>,
  ): Promise<Feedback> {
    
    // if(feedback.image1){
    //   feedback.image1 = await this.convertbase64image(feedback.fullname, feedback.image1);
    // }
    // if(feedback.image2){
    //   feedback.image2 = await this.convertbase64image(feedback.fullname, feedback.image2);
    // }
    // if(feedback.image3){
    //   feedback.image3 = await this.convertbase64image(feedback.fullname, feedback.image3);
    // }
    // if(feedback.image4){
    //   feedback.image4 = await this.convertbase64image(feedback.fullname, feedback.image4);
    // }

    
    feedback.createdDate = new Date();
    if(feedback.toId){
      let customer = await this.customersRepository.findById(feedback.toId)
      if(customer){
        let overAllrating = customer.stars || 0
        let totalRating = customer.totalRatings || 0
        let newRating = feedback.stars
        let totalStars = ((overAllrating * totalRating) + newRating) / (totalRating + 1)
        await this.customersRepository.updateAll({ stars: totalStars, totalRatings: totalRating + 1 }, { id: feedback.toId });
      }
      
    }
    
    //delete feedback.image;
    return this.feedbackRepository.create(feedback);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/feedbacks/count', {
    responses: {
      '200': {
        description: 'Feedback model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Feedback)) where?: Where<Feedback>,
  ): Promise<Count> {
    return this.feedbackRepository.count(where);
  }

  //@secured(SecuredType.IS_AUTHENTICATED)
  @get('/feedbacks', {
    responses: {
      '200': {
        description: 'Array of Feedback model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Feedback, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Feedback)) filter?: Filter<Feedback>,
  ): Promise<Feedback[]> {
    // if(filter){
    //   filter.order = ['createdDate Desc']
    // }else{
    //   filter = {};
    //   filter.order = ['createdDate Desc']
    // }
    return this.feedbackRepository.find(filter);
  }


  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/feedbacks', {
    responses: {
      '200': {
        description: 'Feedback PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Feedback, {partial: true}),
        },
      },
    })
    feedback: Feedback,
    @param.query.object('where', getWhereSchemaFor(Feedback)) where?: Where<Feedback>,
  ): Promise<Count> {
    return this.feedbackRepository.updateAll(feedback, where);
  }


  @secured(SecuredType.IS_AUTHENTICATED)
  @get('/feedbacks/{id}', {
    responses: {
      '200': {
        description: 'Feedback model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Feedback, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Feedback)) filter?: Filter<Feedback>
  ): Promise<Feedback> {
    return this.feedbackRepository.findById(id, filter);
  }


  @secured(SecuredType.IS_AUTHENTICATED)
  @patch('/feedbacks/{id}', {
    responses: {
      '204': {
        description: 'Feedback PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Feedback, {partial: true}),
        },
      },
    })
    feedback: Feedback,
  ): Promise<void> {
    await this.feedbackRepository.updateById(id, feedback);
  }

  @secured(SecuredType.IS_AUTHENTICATED)
  @put('/feedbacks/{id}', {
    responses: {
      '204': {
        description: 'Feedback PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() feedback: Feedback,
  ): Promise<void> {
    await this.feedbackRepository.replaceById(id, feedback);
  }


  @secured(SecuredType.IS_AUTHENTICATED)
  @del('/feedbacks/{id}', {
    responses: {
      '204': {
        description: 'Feedback DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.feedbackRepository.deleteById(id);
  }

  async convertbase64image(imagename: string, image: string) : Promise<string>{
    let base64String = image;
    let base64Image = base64String.split(';base64,').pop();
    imagename = imagename.replace(/ /g, '_')+'.png'
    let imagePath =  path.join(__dirname, '../../public/feedback/images/')+imagename;
    let imageUrl = '/feedback/images/'+imagename;
    await writeFilePromise(imagePath, base64Image,  {encoding: 'base64'});
    return imageUrl;
  }

  //wordpress/index.php?rest_route=/contact-form-7/v1/contact-forms/76/feedback
  //@secured(SecuredType.IS_AUTHENTICATED)
  @post('/web/contact-us', {
    responses: {
      '204': {
        description: 'Feedback Posted success',
      },
    },
  })
  async contactUs(@requestBody() feedback: Feedback): Promise<Feedback> {
    return this.feedbackRepository.create(feedback);
  }




}
