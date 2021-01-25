import fs from 'fs';
import path from 'path';
import util from 'util';
const writeFilePromise = util.promisify(fs.writeFile)


export class ConvertImage { 
    
    //abc (){}
    async convertbase64image(displayName: string, image: string) : Promise<string>{
        let base64String = image;
        let base64Image = base64String.split(';base64,').pop();
        let imageName = displayName.replace(' ', '')+'.png'
        let imagePath =  path.join(__dirname, '../../public/products/images/')+imageName;
        let imageUrl = '/products/images/'+imageName;
        await writeFilePromise(imagePath, base64Image,  {encoding: 'base64'});
        return imageUrl;
      }
  }