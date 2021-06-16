import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class ConectionsService {
  
 // private baseUrl = 'https://order-app-76ad0.firebaseio.com';  
 private Localhost ='http://localhost/ServiceProntoBook/api/Geral/' ;
 private Localhostpermanant ='http://localhost:60313/api/Geral/' ;
 private EngineHostApi = 'localhost:8081';
 //private id : any;
 private headers = new Headers();

 constructor(private http: Http) {
  this.headers.append('Content-Type', 'application/json');
 }

 private encripta(valor: string): string {
   let retorno: string;
   let stexto: string;
   retorno = "";
   try{
     stexto = valor.toString().trim();
   } catch (err) {
     stexto = valor;
   }
   if(stexto==null)
     stexto="";
   if(stexto=="")
     return stexto;    
     while (true)
     {
       let letra:string;
       let nnumero:number;
       let snumero:string;
       if(stexto.length>1)
         letra = stexto.substring(0, 1);
       else
         letra = stexto;
 
       nnumero = letra.toString().charCodeAt(0);
       nnumero += 166;
       snumero = nnumero.toString();
       if(snumero.length<3)
         snumero = "0" + snumero;
       if (snumero.length < 3)
           snumero = "0" + snumero;
         
       retorno += snumero;
       if(stexto.length>1)
         stexto = stexto.substring(1);
       else
         stexto = "";
       if (stexto == "")
         break;
     }
     return retorno;
 }
/*
 EngineQueryStoreProc(params){
   return new Promise(resolve => {
    this.http.get(`${this.EngineHostApi}StoreProc?params=`+params)
    .subscribe(
     res => resolve(res.json()),
     err => resolve(err.json())
     );
  });
 }
*/

// metodo for response message retur EngineAPI
MessageFetchEngineAPI = function(JsonDataProcessResults, DialogMsgRetEnabled) {
 var RetMsg = JsonDataProcessResults.metadata.message;
 if (JsonDataProcessResults.metadata.success) {
     // script returned error	
     if (DialogMsgRetEnabled) {
         this.loading = this.loadingCtrl.create({
           content: RetMsg
         });
         this.loading.present();
     } else {//log(RetMsg);
     }
     return true;
 }  else if (JsonDataProcessResults.metadata.session == false) {    
       if (DialogMsgRetEnabled) {
           this.loading = this.loadingCtrl.create({
             content: RetMsg
           });
           this.loading.present();
       } else {//log(RetMsg);
     }
     return false;    
     
 } else {
     if (DialogMsgRetEnabled) {
         this.loading = this.loadingCtrl.create({
           content: RetMsg
         });
         this.loading.present();
     } else {//log(RetMsg);
     }
     return false;
 }
}


EngineQueryStoreProc = async function(pParamEntidadeDB, pStoreProcParamsJSON, pSessionStorage, callback) {
 //--------------------------------------------------------------------------------------------
 // Criando uma instrução para o metodo DataProcessDB que de acordo com o ParamSQLType tipo 
 // retorna dados para sessionStorage ou processamento na FrontEnd do módulo da aplicação
 // Criação / Atualização: 12/06/2019 as 15:35          
 // Por Gilson DeLima
 // Atulização
 // + callback, função que se executa depois de obter os dados do Engine
 //--------------------------------------------------------------------------------------------

 //sessionStorage.setItem("SessionStorageVariavel", pSessionStorage)
 const ConstSessionStorage = pSessionStorage;

 var ParamSQLType = "StoreProc";
 var ParamEntidadeDB = pParamEntidadeDB;
 var ParamWhereDB = "";
 var ParamDataJson = JSON.stringify(pStoreProcParamsJSON);
 //log(ParamDataJson);
 //var ParamURL = "";
 var ParamHashkey = sessionStorage.SessionHashkey;

 const paramUrlAPI = sessionStorage.getItem('SessionHost') + '/DataProcess?';
 const paramsAPI = "EntidadeDB=" + ParamEntidadeDB + "&DataJson=" + ParamDataJson + "&WhereDB=" + ParamWhereDB + "&SQLType=" + ParamSQLType + "&Hashkey=" + ParamHashkey;

 const EngineAPI = paramUrlAPI + paramsAPI
 //var DataProcessResults = "";
 fetch(EngineAPI).then(response=>{
     if (response.status === 200) {
         return response.json();
     } else {
         throw new Error('Algo deu errado no servidor da EngineAPI!');
     }
 }).then(response=>{
     if (this.MessageFetchEngineAPI(response, true)) {
         //console.debug(response);
         sessionStorage.setItem(ConstSessionStorage, JSON.stringify(response.metadata.StringJSONDataSet))        
         sessionStorage.setItem(ConstSessionStorage+'Grid', JSON.stringify(response.metadata.StringJSONDataGrid))
         if (typeof callback === "function") {
             callback()
         }
         return true;
     } else
     {
         sessionStorage.setItem(ConstSessionStorage, '')        
         sessionStorage.setItem(ConstSessionStorage+'Grid', '')
         return false;

     }
     //String.fromCharCode(39)

 }).catch(error=>{
     console.error(error);
     return false;
 });

}

getMunicipios(uf){
   return new Promise(resolve => {
    this.http.get(`${this.Localhost}ConsultaMunicipios?uf=${this.encripta(uf)}`)
    .subscribe(
     res => resolve(res.json()),
     err => resolve(err.json())
     );
  });
 }

 salvarCadastro(ret, data){
   console.log(this.Localhost, data);
   return new Promise(resolve => {
     this.http.post(`${this.Localhost}SalvarCadastro`, data,
             JSON.stringify(ret))
             .subscribe(
               res => resolve(res.json()),
               err => resolve(err.json())
               );
            });
 }

 alterCadastro(ret, data){
   console.log(this.Localhost, data);
   return new Promise(resolve => {
     this.http.post(`${this.Localhost}AlterarCadastro`, data,
             JSON.stringify(ret))
             .subscribe(
               res => resolve(res.json()),
               err => resolve(err.json())
               );
            });
 }

 alterSenha(ret, data){
   console.log(this.Localhost, data);
   return new Promise(resolve => {
     this.http.post(`${this.Localhost}AlterarSenha`, data,
             JSON.stringify(ret))
             .subscribe(
               res => resolve(res.json()),
               err => resolve(err.json())
               );
            });
 }

 recuperarSenha(ret, data){
   console.log(this.Localhost, data);
   return new Promise(resolve => {
     this.http.post(`${this.Localhost}RecuperarSenha`, data,
             JSON.stringify(ret))
             .subscribe(
               res => resolve(res.json()),
               err => resolve(err.json())
               );
            });
 }

 consultaUsuario(ret, data){
   console.log(this.Localhost, data);
   return new Promise(resolve => {
     this.http.post(`${this.Localhost}ConsultaUsuario`, data,
             JSON.stringify(ret))
             .subscribe(
               res => resolve(res.json()),
               err => resolve(err.json())
               );
            });
 }

 getLocais(ret, data){
   console.log(this.Localhost, data);
   return new Promise(resolve => {
     this.http.post(`${this.Localhost}ConsultaLocais`, data,
             JSON.stringify(ret))
             .subscribe(
               res => resolve(res.json()),
               err => resolve(err.json())
               );
            });
 }

 getEventos(ret, data){
   console.log(this.Localhost, data);
   return new Promise(resolve => {
     this.http.post(`${this.Localhost}ConsultaEventos`, data,
             JSON.stringify(ret))
             .subscribe(
               res => resolve(res.json()),
               err => resolve(err.json())
               );
            });
 }

 getCategories(user){
   return new Promise(resolve => {
    this.http.get(`${this.Localhost}ConsultaCategories?id_rest=${user}`)
    .subscribe(res => resolve(res.json())) ;
   });
 }

 getCategories2(user){
   return new Promise(resolve => {
    this.http.get(`${this.Localhost}ConsultaCategories?id_rest=${user.id_restaurant}`)
    .subscribe(res => resolve(res.json())) ;
   });
 }

 sendCategoria(data,user){
   return new Promise(resolve => {
     this.http.post(`${this.Localhost}setcategoria?namecategoria=${data.categoria}&id_rest=${user}`,
             JSON.stringify(data)) //{headers: this.headers}
         .subscribe(res => resolve(res.json())) //ok;1;
   });
 }

 deleteCategoria(data){
   return new Promise(resolve => {
    this.http.delete(`${this.Localhost}deleteCategoria?id=${data.id_category}`)
    .subscribe(res => resolve(res.json())) ;
   });
 }

 getMenu(category){
   return new Promise(resolve => {
    this.http.get(`${this.Localhost}ConsultaMenu?category=${category}`)
    .subscribe(res => resolve(res.json())) ;
   });
 }

 // &id_restaurant=1
 sendMenuType(data, item, user ){
   console.log(item);
   return new Promise(resolve => {
     this.http.post(`${this.Localhost}setMenyType?name=${data.name}
     &description=${data.description}
     &price=${data.price}
     &id_category=${item.id_category}
     &id_restaurant=${user}`,JSON.stringify(data)) //{headers: this.headers}
         .subscribe(res => resolve(res.json())) //ok;1;
   });
 }

 deleteMenuType(data){
   return new Promise(resolve => {
    this.http.delete(`${this.Localhost}deleteMenyType?id=${data.id_menu}`)
    .subscribe(res => resolve(res.json())) ;
   });
 }
 

//id_restaurant id_cliente
 sendorders(order,user){
   return new Promise(resolve => {
     this.http.post(`${this.Localhost}setOrder?id_user=${order.id_remote}&id_restaurant=
         ${order.id_restaurant}&id_menu=${order.id_menu}&description=${order.description}
         &price=${order.price}&quantity=${order.quantity}&id_table=${order.id_table}
         &id_garcao=${order.id_garcao}&id_client=${user.id}`,
            JSON.stringify(order)) //{headers: this.headers}
         .subscribe(res => resolve(res.json())) //ok;1;
   });
 }


//id_user
 receiveorders(){
   return new Promise(resolve => {
    this.http.get(`${this.Localhost}ConsultaOrders?id_user=1`)
    .subscribe(res => resolve(res.json())) ;
   });
 }


 deleteorder(order){
   return new Promise(resolve => {
    this.http.delete(`${this.Localhost}deleteOrder?id=${order.id}`)
    .subscribe(res => resolve(res.json())) ;
   });
 }

//id_servidor
 getTables(id_user , id_restaurant, usertype){
   console.log("Id RESTAURANTE",id_restaurant);
   console.log("Id USER",id_user);
   return new Promise(resolve => {
    this.http.get(`${this.Localhost}ConsultaTables?id_servidor=${id_user}&id_restaurant=${id_restaurant}&usertype=${usertype}`)
    .subscribe(res => resolve(res.json())) ;
   });
 }

 setTable(id_garcao,id_restaurant,numTable,capacity){
   return new Promise(resolve => {
    this.http.post(`${this.Localhost}settable?id_garcao=${id_garcao}
    &id_restaurant=${id_restaurant}
    &numTable=${numTable}
    &capacity=${capacity}`,
    JSON.stringify(numTable,capacity)) 
        .subscribe(res =>  resolve(res.json())
      )
   });
 }

 deleteTable(data){
   return new Promise(resolve => {
    this.http.delete(`${this.Localhost}deleteTable?id=${data}`)
    .subscribe(res => resolve(res.json())) ;
   });
 }

 getTableOrders(id_table){
   return new Promise(resolve => {
    this.http.get(`${this.Localhost}ConsultaTableOrders?id_table=${id_table}`)
    .subscribe(res => resolve(res.json())) ;
   });
 }



 getQRcode(code){
   return new Promise(resolve => {
     this.http.get(`${this.Localhost}ConsultaQrCode?QrcodeString=${code}`)
     .subscribe(res => resolve(res.json())) ;
    });
 }

 //Id_restaurante
 setQrCode(id_gerente,newQRcode,latitude, longitude){
   return new Promise(resolve => {
     this.http.post(`${this.Localhost}setQrCode?id_gerente=${id_gerente}
     &QrcodeString=${newQRcode}&latitude=${latitude}&longitude=${longitude}`,JSON.stringify(newQRcode)) 
         .subscribe(res =>  resolve(res.json())
       )
   });
 }

 setGarcaoesAcesso(id_restaurant,id,status){
   return new Promise(resolve => {
     this.http.post(`${this.Localhost}setGarcaoesAcesso?id_restaurant=${id_restaurant}&id=${id}&rest_block=${status}`,
                     JSON.stringify(status)) 
         .subscribe(res =>  resolve(res.json())
       )
   });
 }


 getGarcaoes(gerente , id_restaurant){
   console.log("Id_User",id_restaurant)
   return new Promise(resolve => {
     this.http.get(`${this.Localhost}getgarcaoes?gerente=${gerente}&id_restaurant=${id_restaurant}`)
     .subscribe(res => resolve(res.json())) ;
    });
 }
 // string listtype, int id_restaurant, int id_garcao
 getMesasGarcao(listtype, id_restaurant, id_garcao){
   console.log("Id_User",id_restaurant);
   console.log("Id_Garcon",id_garcao);
   return new Promise(resolve => {
     this.http.get(`${this.Localhost}getMesasGarcao?listtype=${listtype}&id_restaurant=${id_restaurant}&id_garcao=${id_garcao}`)
     .subscribe(res => resolve(res.json())) ;
    });
 }
 // id_table
 getoredersmesa(usertype,id_table, id_client){
   console.log("UserType");
   console.log(usertype);
   return new Promise(resolve => {
     this.http.get(`${this.Localhost}getoredersmesa?id_table=${id_table}&usertype=${usertype}&id_cliente=${id_client}`)
     .subscribe(res => resolve(res.json())) ;
    });
 }

 // getoredersmesa1(usertype,id_table,id_cliente){
 //   return new Promise(resolve => {
 //     this.http.get(`${this.Localhost}getoredersmesaviaCliente?id_table=${id_table}&id_cliente=${id_cliente}&usertype=${usertype}`)
 //     .subscribe(res => resolve(res.json())) ;
 //    });
 // }
 

 checklogin(login){
   return new Promise(resolve => {
     this.http.get(`${this.Localhost}checklogin?login=${login}`)
     .subscribe(res => resolve(res.json())) ;
    });
 }

 addGarcao(id_restaurant,name,login,password){
 return new Promise(resolve => {
   this.http.post(`${this.Localhost}setnovoGarcao?id_restaurant=${id_restaurant}
   &name=${name}
   &login=${login}
   &password=${password}`,
                   JSON.stringify(login)) 
       .subscribe(res =>  resolve(res.json())
     )
 });
}

 setPedidas(order,data){
   return new Promise(resolve => {
   this.http.post(`${this.Localhost}setPedidas?id_client=${order.id_client}&id_restaurant=${order.id_restaurant}&id_table=${order.id_table}&id_garcao=${order.id_garcao}&subtotal=${data.subtotal}&servico=${data.servico}&total=${data.total}`,
   JSON.stringify(data)) 
       .subscribe(res =>  resolve(res.json())
     )
 });
}

 setPedidasMenu(order,data,id_pedida){
   return new Promise(resolve => {
   this.http.post(`${this.Localhost}setPedidasMenu?id_menu=${order.id_menu}&quantity=${order.quantity}&description=${order.description_client}&id_pedida=${id_pedida}&id_order=${order.id}`,
   JSON.stringify(data)) 
       .subscribe(res =>  resolve(res.json())
     )
 });
}

getpedidas(id_client){
 return new Promise(resolve => {
   this.http.get(`${this.Localhost}getpedidas?id_client=${id_client}`)
   .subscribe(res => resolve(res.json())) ;
  });
}

updateProfil(user,novouser){
 return new Promise(resolve => {
 this.http.post(`${this.Localhost}updateProfil?id=${user.id}&email=${novouser.email}&nome=${novouser.name}&endereco=${novouser.endereco}&cidade=${novouser.cidade}&cellular=${novouser.cellular}`,
 JSON.stringify( novouser)) 
     .subscribe(res =>  resolve(res.json())
   )
});
}

getcowzinhar(){
   return new Promise(resolve => {
     this.http.get(`${this.Localhost}ConsultaCozinhar`)
     .subscribe(res => resolve(res.json())) ;
    });
 }

 getbarorder(){
   return new Promise(resolve => {
     this.http.get(`${this.Localhost}ConsultaBar`)
     .subscribe(res => resolve(res.json())) ;
    });
 }

 allocateTable(id_restaurant,id_user , id_table){

   return new Promise(resolve => {
   this.http.get(`${this.Localhost}SetTable?id_restaurant=${id_restaurant}&id_client=${id_user}&id_table=${id_table}`,
   JSON.stringify( 3)) 
       .subscribe(res =>  resolve(res.json())
       
     )
 });
 }

 getMelhorComida(){
   return new Promise(resolve => {
     this.http.get(`${this.Localhost}ConsultaMelhorComida`)
     .subscribe(res => resolve(res.json())) ;
    });
 }

 getMelhorBebidas(){
   return new Promise(resolve => {
     this.http.get(`${this.Localhost}ConsultaMelhorBebidas`)
     .subscribe(res => resolve(res.json())) ;
    });
 }

 getMelhorMesa(){
   return new Promise(resolve => {
     this.http.get(`${this.Localhost}ConsultaMelhorMesa`)
     .subscribe(res => resolve(res.json())) ;
    });
 }

 getMelhorGarcao(){
   return new Promise(resolve => {
     this.http.get(`${this.Localhost}ConsultaMelhorGarcao`)
     .subscribe(res => resolve(res.json())) ;
    });
 }

 getRestaurante(){
   console.log();
   return new Promise(resolve => {
     this.http.get(`${this.Localhost}getRestaurante?id_gerente=3`)
     .subscribe(res => resolve(res.json())) ;
    });
 }

 getRating(){
   return new Promise(resolve => {
     this.http.get(`${this.Localhost}GetRating`)
     .subscribe(res => resolve(res.json())) ;
    });
 }

 SearchRestaurant(search){
   console.log();
   return new Promise(resolve => {
     this.http.get(`${this.Localhost}ConsultaSearchRestaurant?rest_name=${search}`)
     .subscribe(res => resolve(res.json())) ;
    });  
 }


sendEvents(data, user){
 return new Promise(resolve => {
   this.http.post(`${this.Localhost}setEvents?id_rest=${user}&nome_event=${data.event}&date=${data.date}
   &desc=${data.desc}&stime=${data.início}&etime=${data.Fim}`,
           JSON.stringify(data)) //{headers: this.headers}
       .subscribe(res => resolve(res.json())) //ok;1;
 });
}

getEvents(user){
 return new Promise(resolve => {
  this.http.get(`${this.Localhost}ConsultaEvents?id_rest=${user}`)
  .subscribe(res => resolve(res.json())) ;
 });
}

deleteEvents(data){
 return new Promise(resolve => {
  this.http.delete(`${this.Localhost}deleteEvents?id=${data.id}`)
  .subscribe(res => resolve(res.json())) ;
 });
}

sendReview(data,rest,value,value1,value2,value3){
 return new Promise(resolve => {
   this.http.post(`${this.Localhost}setRating?id_rest=${rest}&id_cliente=${1}&rating_service=${value}
   &rating_price=${value1}&rating_access=${value2}&rating_promotion=${value3}`,
           JSON.stringify(data)) //{headers: this.headers}
       .subscribe(res => resolve(res.json())) //ok;1;
 });
}

sendReservation(id,user){
 return new Promise(resolve => {
   this.http.post(`${this.Localhost}setReservation?id_rest=${id}&id_cliente=${'2'}&nome=${'Ahmed Bali'}`,
           JSON.stringify(user)) //{headers: this.headers}
       .subscribe(res => resolve(res.json())) //ok;1;
 });
}

}
