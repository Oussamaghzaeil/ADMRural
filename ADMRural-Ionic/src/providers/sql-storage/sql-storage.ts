import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { Usuario } from '../../providers/user-classes/user-classes'

@Injectable()
export class SqlStorage {
  constructor(private dbProvider: DatabaseProvider) { }

  public saveUser(user) {
    console.log("user1:", user);
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select CodigoUsuario from tblUsuarioSistema where CodigoUsuario = ?';
        let data = [user.CodigoUsuario];
        console.log("data:", data);
        return db.executeSql(sql, data)
          .then((data: any) => {
            console.log('data :', data);
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              console.log("item:", item);
              let cod: number = item.CodigoUsuario;
              this.updateUser(user, db);
            } else {
              this.insertUser(user, db);
            }

            return user;
          })
          .catch((e) => console.error('erro1:', e));
      })
      .catch((e) => console.error('erro2:', e));
  }

  public insertUser(user, db: SQLiteObject) {
    console.log("userinsert:", user);
    let sql: string = 'insert into tblUsuarioSistema (CodigoUsuario, Email, Nome, Celular, DD, Senha, hashkey, connection, photopath)';
    sql += ' values(?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let data = [user.CodigoUsuario, user.Email, user.Nome, user.Celular, user.DD, this._numeros(user.Senha), user.hashkey, user.connection,
    user.photopath];
    console.log("datainser:", data);

    return db.executeSql(sql, data)
      .catch((e) => console.error("erro insert user:", e));
  }

  public updateUser(user, db: SQLiteObject) {
    let sql: string = 'update tblUsuarioSistema set';
    sql += ' Nome=?, Email=?, Senha=?,hashkey=?, connection=?,  DD=?, Celular=?, photopath=?';
    sql += ' where CodigoUsuario=?'
    let data = [user.Nome, user.Email, this._numeros(user.Senha), user.hashkey, user.connection, user.DD, user.Celular, user.photopath];
    return db.executeSql(sql, data)
      .catch((e) => console.error("erro update:", e));
  }

  public getUser(user: Usuario) {
    console.log("user21:", user);

    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select CodigoUsuario, Nome, Email, Senha, hashkey, connection , DD, Celular, photopath';
        sql = sql + ' from tblUsuarioSistema';
        sql = sql + ' where Email=? and Senha=?';
        let data = [user.Email, this._numeros(user.Senha)];
        console.log("data21:", data);
        return db.executeSql(sql, data)
          .then((data: any) => {
            console.log("data3:", data);
            if (data.rows.length > 0) {
              let item = data.rows.item(0);

              return item;
            }

            return null;
          })
          .catch((e) => console.error("erro get user1:", e));
      })
      .catch((e) => console.error("erro get user2:", e));
  }

  public saveFazenda(user) {
    console.log("user1:", user);
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select CodigoUsuario from tblFazendasv1 where CodigoFazenda = ?';
        let data = [user.CodigoFazenda];
        console.log("data:", data);
        return db.executeSql(sql, data)
          .then((data: any) => {
            console.log('data :', data);
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              console.log("item:", item);
              let cod: number = item.CodigoFazenda;
              this.updateFazenda(user, db);
            } else {
              this.insertFazenda(user, db);
            }

            return user;
          })
          .catch((e) => console.error('erro1:', e));
      })
      .catch((e) => console.error('erro2:', e));
  }

  public insertFazenda(user, db: SQLiteObject) {
    //console.log("userinsert:", user);
    let sql: string = 'insert into tblFazendasv1 (CodigoFazenda, NomeFazenda, ActiveFazenda, ObservacoesFazenda, UfFazenda, NomeMunicipioFazenda, EnderecoFazenda, LatitudeFazenda, LongitudeFazenda, ValorAtualFazenda, ValorInicialFazenda, ImgFazenda, CodigoUsuario)';
    sql += ' values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let data = [user.CodigoFazenda, user.NomeFazenda, user.ActiveFazenda, user.ObservacoesFazenda, user.UfFazenda,
    user.NomeMunicipioFazenda, user.EnderecoFazenda, user.LatitudeFazenda, user.LongitudeFazenda, user.ValorAtualFazenda,
    user.ValorInicialFazenda, user.ImgFazenda, user.CodigoUsuario];
    //console.log("datainser:", data);

    return db.executeSql(sql, data)
      .catch((e) => console.error("erro insert fazenda:", e));
  }

  public updateFazenda(user, db: SQLiteObject) {
    let sql: string = 'update tblFazendasv1 set';
    sql += ' NomeFazenda = ?, ActiveFazenda = ?, ObservacoesFazenda = ?, UfFazenda = ?, NomeMunicipioFazenda = ?, EnderecoFazenda = ?, LatitudeFazenda = ?, LongitudeFazenda = ?, ValorAtualFazenda = ?, ValorInicialFazenda = ?, ImgFazenda = ?, CodigoUsuario = ?';
    sql += ' where CodigoFazenda=?'
    let data = [user.NomeFazenda, user.ActiveFazenda, user.ObservacoesFazenda, user.UfFazenda, user.NomeMunicipioFazenda,
    user.EnderecoFazenda, user.LatitudeFazenda, user.LongitudeFazenda, user.ValorAtualFazenda, user.ValorInicialFazenda,
    user.ImgFazenda, user.CodigoUsuario];
    return db.executeSql(sql, data)
      .catch((e) => console.error("erro update:", e));
  }

  public getFazenda(user: Usuario) {
    //console.log("user21:", user);

    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select CodigoFazenda, NomeFazenda, ActiveFazenda, ObservacoesFazenda, UfFazenda, NomeMunicipioFazenda, EnderecoFazenda, LatitudeFazenda, LongitudeFazenda, ValorAtualFazenda, ValorInicialFazenda, ImgFazenda, CodigoUsuario';
        sql = sql + ' from tblFazendasv1';
        sql = sql + ' where CodigoUsuario =?';
        let data = [user];
       // console.log("codigo Usuario:", data);
        return db.executeSql(sql, data)
          .then((data: any) => {
            console.log("data length:", data.rows.length);
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              return item;
            }

            return null;
          })
          .catch((e) => console.error("erro get user1:", e));
      })
      .catch((e) => console.error("erro get user2:", e));
  }

  public getQuery(sql, data) {
    console.log("The sql query ==>",sql);
    console.log("The Data for query ==>", data);
    
    
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        return db.executeSql(sql, data)
          .then((data: any) => {
            return data;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


  public saveUF(user) {
    //console.log("user1:", user);
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select CodigoBaseUF from tblBaseUF';
        let data = [];
        return db.executeSql(sql, data)
          .then((data: any) => {
            console.log('data :', data);
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              //console.log("item:", item);
              let cod: number = item.CodigoBaseUF;
              this.updateUF(user, db);
            } else {
              this.insertUf(user, db);
            }

            return user;
          })
          .catch((e) => console.error('erro1:', e));
      })
      .catch((e) => console.error('erro2:', e));
  }

  

  public insertUf(user, db: SQLiteObject) {
    //console.log("userinsert:", user);
    let sql: string = 'insert into tblBaseUF (CodigoBaseUF, Nome, Sigla)';
    sql += ' values(?, ?, ?)';
    let data = [user.CodigoBaseUF, user.Nome, user.Sigla];
    //console.log("datainser:", data);
    return db.executeSql(sql, data)
      .catch((e) => console.error("erro insert UF:", e));
  }

  public updateUF(user, db: SQLiteObject) {
    let sql: string = 'update tblBaseUF set';
    sql += ' Nome = ?, Sigla= ?';
    sql += ' where CodigoBaseUF=?'
    let data = [user.Nome, user.Sigla, user.CodigoBaseUF];
    return db.executeSql(sql, data)
      .catch((e) => console.error("erro update UF:", e));
  }

  public saveMunicipio(user) {
    console.log("In the save Municipio function:", user);
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select CodigoBaseMunicipio from tblBaseMunicipio';
        let data = [];
        return db.executeSql(sql, data)
          .then((data: any) => {
            console.log('data :', data);
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              console.log("item:", item);
              let cod: number = item.CodigoBaseMunicipio;
              this.updateMunicipio(user, db);
            } else {
              this.insertMunicipio(user, db);
            }

            return user;
          })
          .catch((e) => console.error('erro1:', e));
      })
      .catch((e) => console.error('erro2:', e));
  }

  public insertMunicipio(user, db: SQLiteObject) {
    console.log("userinsert:", user);
    let sql: string = 'insert into tblBaseMunicipio (CodigoBaseMunicipio, CodigoBaseUF, Nome, Populacao, IndicadorCapital)';
    sql += ' values(?, ?, ?, ?, ?)';
    let data = [user.CodigoBaseMunicipio, user.CodigoBaseUF, user.Nome, user.Populacao, user.IndicadorCapital];
    console.log("datainser:", data);
    return db.executeSql(sql, data)
      .catch((e) => console.error("erro insert UF:", e));
  }

  public updateMunicipio(user, db: SQLiteObject) {
    let sql: string = 'update tblBaseMunicipio set';
    sql += ' CodigoBaseUF = ?, Nome = ?, Populacao = ?, IndicadorCapital = ?';
    sql += ' where CodigoBaseMunicipio=?'
    let data = [user.CodigoBaseUF, user.Nome, user.Populacao, user.IndicadorCapital, user.CodigoBaseMunicipio];
    return db.executeSql(sql, data)
      .catch((e) => console.error("erro update UF:", e));
  }

   //---------------------------------Animais Start --------------------------------//

   public saveAnimais(user) {
    console.log("user1:", user);
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select CodigoAnimal from tblAnimais ';
        let data = [];
        console.log("data:", data);
        return db.executeSql(sql, data)
          .then((data: any) => {
            console.log('data :', data);
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              console.log("item:", item);
              let cod: number = item.CodigoAnimal;
              this.updateAnimais(user, db);
            } else {
              this.insertAnimais(user, db);
            }

            return user;
          })
          .catch((e) => console.error('erro1:', e));
      })
      .catch((e) => console.error('erro2:', e));
  }

  public insertAnimais(user, db: SQLiteObject) {
    //console.log("userinsert:", user);
    let sql: string = 'insert into tblAnimais (CodigoAnimal, CodigoFazendaAnimal, FazendaAnimal, ImgAnimal, TipoAnimal, IdentificacaoAnimal, SexoAnimal, RacaAnimal, QtdAtualAnimal, UnidadPesoAnimal, PesoAtualAnimal, ValorAtualAnimal, HiddenAnimal, InactiveAnimal, ChangeLog, ObservacoesAnimal, Datadenascimento, Datadeaquisicao, Situacao, Dataa, Precosaida, ObservacoesAnimalvendo, Datadevendo, Transferencia, CodigoAnimalInicial, Coletivo)';
    sql += ' values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let data = [user.CodigoAnimal, user.CodigoFazendaAnimal, user.FazendaAnimal, user.ImgAnimal, user.TipoAnimal, user.IdentificacaoAnimal, user.SexoAnimal, user.RacaAnimal, user.QtdAtualAnimal, user.UnidadPesoAnimal, user.PesoAtualAnimal, user.ValorAtualAnimal, user.HiddenAnimal, user.InactiveAnimal, user.ChangeLog, user.ObservacoesAnimal, user.Datadenascimento, user.Datadeaquisicao, user.Situacao, user.Dataa, user.Precosaida, user.ObservacoesAnimalvendo, user.Datadevendo, user.Transferencia, user.CodigoAnimalInicial, user.Coletivo];
    //console.log("datainser:", data);

    return db.executeSql(sql, data)
      .catch((e) => console.error("erro insert animais:", e));
  }

  public updateAnimais(user, db: SQLiteObject) {
    let sql: string = 'update tblAnimais set';
    sql += ' CodigoAnimal =?, CodigoFazendaAnimal =?, FazendaAnimal, ImgAnimal, TipoAnimal, IdentificacaoAnimal, SexoAnimal, RacaAnimal, QtdAtualAnimal, UnidadPesoAnimal, PesoAtualAnimal, ValorAtualAnimal, HiddenAnimal, InactiveAnimal, ChangeLog, ObservacoesAnimal, Datadenascimento, Datadeaquisicao, Situacao, Dataa, Precosaida, ObservacoesAnimalvendo, Datadevendo, Transferencia, CodigoAnimalInicial, Coletivo';
    sql += ' where CodigoFazenda=?'
    let data = [ user.CodigoFazendaAnimal,user.FazendaAnimal, user.ImgAnimal, user.TipoAnimal, user.IdentificacaoAnimal, user.SexoAnimal, user.RacaAnimal, user.QtdAtualAnimal, user.UnidadPesoAnimal, user.PesoAtualAnimal, user.ValorAtualAnimal, user.HiddenAnimal, user.InactiveAnimal, user.ChangeLog, user.ObservacoesAnimal, user.Datadenascimento, user.Datadeaquisicao, user.Situacao, user.Dataa, user.Precosaida, user.ObservacoesAnimalvendo, user.Datadevendo, user.Transferencia, user.CodigoAnimalInicial, user.Coletivo];
    return db.executeSql(sql, data)
      .catch((e) => console.error("erro update:", e));
  }

  //-------------------------------Animais End ----------------------------------//

  private _numeros(valor: string): string {
    let retorno: string;
    let stexto: string;
    retorno = "";
    try {
      stexto = valor.trim();
    } catch (err) {
      stexto = valor;
    }
    if (stexto == null)
      stexto = "";
    if (stexto == "")
      return stexto;
    while (true) {
      let letra: string;
      let nnumero: number;
      let snumero: string;
      if (stexto.length > 1)
        letra = stexto.substring(0, 1);
      else
        letra = stexto;

      nnumero = letra.toString().charCodeAt(0);
      nnumero += 166;
      snumero = nnumero.toString();
      if (snumero.length < 3)
        snumero = "0" + snumero;
      if (snumero.length < 3)
        snumero = "0" + snumero;

      retorno += snumero;
      if (stexto.length > 1)
        stexto = stexto.substring(1);
      else
        stexto = "";
      if (stexto == "")
        break;
    }
    return retorno;
  }

}
