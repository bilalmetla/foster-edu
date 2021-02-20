import fs from 'fs';
import path from 'path';
import util from 'util';
const writeFilePromise = util.promisify(fs.writeFile)


export class ConvertImage { 
    
    //abc (){}
    async convertbase64image(displayName: string, image: string, basePath?: string, extention?: string ) : Promise<string>{
        // base64String = image;
        //extention = extention ? extention.toLowerCase() : '.png'
        let base64Image = image.split(';base64,').pop();
        let imageName = displayName.replace(' ', '')+  extention || '.png'
        //let imagePath =  path.join(__dirname, `../../../images/${basePath}/`)+imageName;
        let imagePath =  path.join(__dirname, `../../public/images/${basePath}/`)+imageName;
        let imageUrl = `/images/${basePath}/`+imageName;
        await writeFilePromise(imagePath, base64Image,  {encoding: 'base64'});
        return imageUrl;
      }
  }