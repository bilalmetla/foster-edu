
export class Transaction { 
    private  Model:any;
    private  isInTransation: boolean;
    private session: any;

    constructor(model:any){
        this.Model = model;
        this.isInTransation = false;
    }


    start() {
        let self = this;
        let connector = self.Model.dataSource.connector;
        console.log(`Transaction start connector : ${connector}`);
        if (connector.name !== 'mongodb') {
          throw new Error('Only support mongodb database transaction');
        }
        else {
          if (!self.isInTransation) {
            self.session = connector.client.startSession();

            console.log(`Transaction started : ${self.session}`);

            self.session.startTransaction();
            self.isInTransation = true;
          } 
          return self.session;
        }
      }


      async commit () {
        let self = this;
        console.log(`Transaction commit : ${self}`);
        if (self.isInTransation) {
            
          await self.session.commitTransaction();
          self.session.endSession();
          self.isInTransation = false;
        }
      }


      async rollback() {
        let self = this;
        console.log(`Transaction rollback : ${self}`);
        if (self.isInTransation) {
          await self.session.abortTransaction();
          self.session.endSession();
          self.isInTransation = false;
        }
    }


}
//end of Transaction class
