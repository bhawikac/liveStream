import * as actionTypes from '../actions/actionTypes';
import { ORM as Schema, Model, many, fk, attr } from 'redux-orm';

export class OnDemandClass extends Model{
    
}

OnDemandClass.modelName='OnDemandClass';
OnDemandClass.fields={
    id:attr(),
    tag:attr(),
    className:attr()
}

export class OnDemandCollection extends Model{
    static reducer(actions,OnDemandCollection,session){
        const {payload,type}= actions;
        switch(actions.type){
            case actionTypes.TEST:
            const classes = actions.classes;
            const props = Object.assign({},payload,{
                onDemandClasses: classes,
                loading: false
            });
            OnDemandCollection.create(props.onDemandClasses)
          
            /*props.onDemandClasses.forEach(function(el){ 
                     
                var item = {
                  id: el.collectionTag,
                collectionTag:el.collectionTag,
                collectionName:el.collectionName,
                collectionType:el.collectionType,
                itemCount:el.itemCount
              };
              var k =[];
               el.collectionItems.forEach(function(item){
                var k1= {
                    id: item.tag,
                  tag: item.tag,
                  className: item.className
                }
                k.push(k1);
               
                
            });
            item.classes = k;
          //  debugger;
              OnDemandCollection.create(item);
             
            });
            //OnDemandCollection.create(props.onDemandClasses);
            OnDemandCollection.filter(x=>x.id=='featured');*/
            break;
        }
    }
}

OnDemandCollection.modelName='OnDemandCollection';
OnDemandCollection.fields={
    id:attr(),
    collectionTag:attr(),
    collectionName:attr(),
    collectionType:attr(),
    itemCount:attr(),
     classes:many('OnDemandClass','OnDemandCollection')
}
export const schema = new Schema();
schema.register(OnDemandCollection,OnDemandClass);
// schema.register(OnDemandClass);

export default schema;