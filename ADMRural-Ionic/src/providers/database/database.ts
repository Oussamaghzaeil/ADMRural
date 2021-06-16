import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  
  public dba: SQLiteObject;

  private TEXT_TYPE:string = ' TEXT';
  private INTEGER_TYPE:string = ' INTEGER';
  private IMAGE_TYPE:string = ' IMAGE';
  private DATE_TYP:string = ' DATE';
  private COMMA_SEP:string = ', ';

  //nome das colunas das tabelas
  //apoio ao sistema
  private COLUMN_NAME_CodigoUsuarioSession:string ='CodigoUsuarioSession';
  private COLUMN_NAME_HashKey:string = 'HashKey';
  private COLUMN_NAME_DataTime: string = 'DataTime';
  private COLUMN_NAME_DataTimeExpiration:string = 'DataTimeExpiration';


  //usuarios
  private COLUMN_NAME_CodigoUsuario:string = 'CodigoUsuario';
  private COLUMN_NAME_Email:string = 'Email';
  private COLUMN_NAME_Nome:string = 'Nome';
  private COLUMN_NAME_Celular:string = 'Celular';
  private COLUMN_NAME_DD:string = 'DD';
  private COLUMN_NAME_Senha:string = 'Senha';
  private COLUMN_NAME_Hashkey:string = 'hashkey';
  private COLUMN_NAME_Connection :string = 'connection'
  private COLUMN_NAME_photopath:string = 'photopath';

  //Fazendas
  private COLUMN_NAME_CodigoFazenda:string = 'CodigoFazenda';
  private COLUMN_NAME_NomeFazenda:string = 'NomeFazenda';
  private COLUMN_NAME_ActiveFazenda:string = 'ActiveFazenda';
  private COLUMN_NAME_ObservacoesFazenda:string = 'ObservacoesFazenda';
  private COLUMN_NAME_UfFazenda:string = 'UfFazenda';
  private COLUMN_NAME_NomeMunicipioFazenda:string = 'NomeMunicipioFazenda';
  private COLUMN_NAME_EnderecoFazenda:string = 'EnderecoFazenda';
  private COLUMN_NAME_LatitudeFazenda:string = 'LatitudeFazenda';
  private COLUMN_NAME_LongitudeFazenda:string = 'LongitudeFazenda';
  private COLUMN_NAME_ValorAtualFazenda:string = 'ValorAtualFazenda';
  private COLUMN_NAME_ValorInicialFazenda:string = 'ValorInicialFazenda';
  private COLUMN_NAME_ImgFazenda:string = 'ImgFazenda';

  //UF
  private COLUMN_NAME_CodigoBaseUF:string = 'CodigoBaseUF';
  private COLUMN_NAME_Sigla:string = 'Sigla';

  //Municipio
  private COLUMN_NAME_CodigoBaseMunicipio:string = 'CodigoBaseMunicipio';
  private COLUMN_NAME_Populacao:string = 'Populacao';
  private COLUMN_NAME_IndicadorCapital:string = 'IndicadorCapital';


  // Estoque Alimentacao
  private COLUMN_NAME_id:string = 'id';
  private COLUMN_NAME_TipodeEntrada:string = 'TipodeEntrada';
  private COLUMN_NAME_DatadeEntrada:string = 'DatadeEntrada';
  private COLUMN_NAME_HoradeEntrada: string = 'HoradeEntrada';


  //Animais
/*   private COLUMN_NAME_CodigoAnimal:string = 'CodigoAnimal';
  private COLUMN_NAME_CodigoFazendaAnimal:string = 'CodigoFazendaAnimal';
  private COLUMN_NAME_FazendaAnimal:string = 'FazendaAnimal';
  private COLUMN_NAME_HoradeEntrada: string = 'HoradeEntrada';


  CodigoAnimal, CodigoFazendaAnimal, FazendaAnimal, ImgAnimal, TipoAnimal, IdentificacaoAnimal, SexoAnimal, 
  RacaAnimal, QtdAtualAnimal, UnidadPesoAnimal, PesoAtualAnimal, ValorAtualAnimal, HiddenAnimal, InactiveAnimal, 
  ChangeLog, ObservacoesAnimal, Datadenascimento, Datadeaquisicao, Situacao, Dataa, Precosaida, ObservacoesAnimalvendo, 
  Datadevendo, Transferencia, CodigoAnimalInicial, Coletivo */

//Animais
private COLUMN_NAME_CodigoAnimal:string = 'CodigoAnimal';
private COLUMN_NAME_CodigoFazendaAnimal:string = 'CodigoFazendaAnimal';
private COLUMN_NAME_FazendaAnimal:string = 'FazendaAnimal';
private COLUMN_NAME_ImgAnimal: string = 'ImgAnimal';
private COLUMN_NAME_TipoAnimal: string = 'TipoAnimal';
private COLUMN_NAME_IdentificacaoAnimal: string = 'IdentificacaoAnimal';
private COLUMN_NAME_SexoAnimal: string = 'SexoAnimal';
private COLUMN_NAME_RacaAnimal: string = 'RacaAnimal';
private COLUMN_NAME_UnidadPesoAnimal: string = 'UnidadPesoAnimal';
private COLUMN_NAME_QtdAtualAnimal: string = 'QtdAtualAnimal';
private COLUMN_NAME_PesoAtualAnimal: string = 'PesoAtualAnimal';
private COLUMN_NAME_ValorAtualAnimal: string = 'ValorAtualAnimal';
private COLUMN_NAME_HiddenAnimal: string = 'HiddenAnimal';
private COLUMN_NAME_InactiveAnimal: string = 'InactiveAnimal';
private COLUMN_NAME_ChangeLog: string = 'ChangeLog';
private COLUMN_NAME_ObservacoesAnimal: string = 'ObservacoesAnimal';
private COLUMN_NAME_Datadenascimento: string = 'Datadenascimento';
private COLUMN_NAME_Datadeaquisicao: string = 'Datadeaquisicao';
private COLUMN_NAME_Situacao: string = 'Situacao';
private COLUMN_NAME_Dataa: string = 'Dataa';
private COLUMN_NAME_Precosaida: string = 'Precosaida';
private COLUMN_NAME_ObservacoesAnimalvendo: string = 'ObservacoesAnimalvendo';
private COLUMN_NAME_Datadevendo: string = 'Datadevendo';
private COLUMN_NAME_Transferencia: string = 'Transferencia';
private COLUMN_NAME_CodigoAnimalInicial: string = 'CodigoAnimalInicial';
private COLUMN_NAME_Coletivo: string = 'Coletivo';



  constructor(private sqlite: SQLite) { }
  
  /**
   * Cria um banco caso não exista ou pega um banco existente com o nome no parametro
   */

  private apagarUsuarioSession() {
    let apagar:string = 'DROP TABLE IF EXISTS tblUsuarioSession';
    return apagar;
  }

  private apagarUsuario() {
    let apagar:string = 'DROP TABLE IF EXISTS tblUsuarioSistema';
    return apagar;
  }

  private criarUsuarioSession() {
    let criar:string = 'CREATE TABLE IF NOT EXISTS tblUsuarioSession(' +
    this.COLUMN_NAME_CodigoUsuarioSession + this.INTEGER_TYPE + ' PRIMARY KEY' + this.COMMA_SEP +
    this.COLUMN_NAME_HashKey + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_DataTime + this.DATE_TYP + this.COMMA_SEP +
    this.COLUMN_NAME_DataTimeExpiration + this.DATE_TYP + ')';
    
    return criar;
  }
  private criarUsuarioSistema(){
    let criar:string = 'CREATE TABLE IF NOT EXISTS tblUsuarioSistema ('
    criar += this.COLUMN_NAME_CodigoUsuario + this.INTEGER_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_Email + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_Nome + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_Celular + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_DD + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_Senha + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_Hashkey + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_Connection + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_photopath + this.IMAGE_TYPE +')';
    return criar;
  }
  private criarFazendasv1(){
    let criar:string = 'CREATE TABLE IF NOT EXISTS tblFazendasv1 ('
    criar += this.COLUMN_NAME_CodigoFazenda + this.INTEGER_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_NomeFazenda + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_ActiveFazenda + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_ObservacoesFazenda + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_UfFazenda + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_NomeMunicipioFazenda + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_EnderecoFazenda + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_LatitudeFazenda + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_LongitudeFazenda + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_ValorAtualFazenda + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_ValorInicialFazenda + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_ImgFazenda + this.IMAGE_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_CodigoUsuario + this.INTEGER_TYPE +')';
    return criar;
  }

  private criarUF(){
    let criar:string = 'CREATE TABLE IF NOT EXISTS tblBaseUF ('
    criar += this.COLUMN_NAME_CodigoBaseUF + this.INTEGER_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_Nome + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_Sigla + this.TEXT_TYPE +')';
    return criar;
  }
 
  private criarMunicipio(){
    let criar:string = 'CREATE TABLE IF NOT EXISTS tblBaseMunicipio ('
    criar += this.COLUMN_NAME_CodigoBaseMunicipio + this.INTEGER_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_CodigoBaseUF + this.INTEGER_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_Nome + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_Populacao + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_IndicadorCapital + this.TEXT_TYPE +')';
    return criar;
  }
private criarAnimais(){
    let criar:string = 'CREATE TABLE IF NOT EXISTS tblAnimais ('
    criar += this.COLUMN_NAME_CodigoAnimal + this.INTEGER_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_CodigoFazendaAnimal + this.INTEGER_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_FazendaAnimal + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_ImgAnimal + this.IMAGE_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_TipoAnimal + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_IdentificacaoAnimal + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_SexoAnimal + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_RacaAnimal + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_QtdAtualAnimal + this.INTEGER_TYPE + this.COMMA_SEP+
    this.COLUMN_NAME_UnidadPesoAnimal + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_PesoAtualAnimal + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_ValorAtualAnimal + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_HiddenAnimal + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_InactiveAnimal + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_ChangeLog + this.TEXT_TYPE+ this.COMMA_SEP +
    this.COLUMN_NAME_ObservacoesAnimal + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_Datadenascimento  + this.DATE_TYP + this.COMMA_SEP +
    this.COLUMN_NAME_Datadeaquisicao  + this.DATE_TYP + this.COMMA_SEP +
    this.COLUMN_NAME_Situacao + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_Dataa  + this.DATE_TYP + this.COMMA_SEP +
    this.COLUMN_NAME_Precosaida + this.INTEGER_TYPE + this.COMMA_SEP+
    this.COLUMN_NAME_ObservacoesAnimalvendo + this.TEXT_TYPE+ this.COMMA_SEP +
    this.COLUMN_NAME_Datadevendo  + this.DATE_TYP + this.COMMA_SEP +
    this.COLUMN_NAME_Transferencia + this.TEXT_TYPE + this.COMMA_SEP +
    this.COLUMN_NAME_CodigoAnimalInicial + this.INTEGER_TYPE + this.COMMA_SEP+
    this.COLUMN_NAME_Coletivo + this.INTEGER_TYPE  +')';

    return criar;
  }

  public getDB() {
    return this.sqlite.create({
      name: 'admrural.db',
      location: 'default'
    });
  }

  /**
   * Cria a estrutura inicial do banco de dados
   */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        this.dba = db;
        console.log('banco criado:');
        // Criando as tabelas
        this.createTables(db);

        // Inserindo dados padrão
        //this.insertDefaultItems(db);

      })
      .catch(e => 
        console.log('erro abrindo:', e)
        );
  }

  /**
   * Criando as tabelas no banco de dados
   * @param db
   */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      //[this.apagarUsuarioSession()],
      //[this.apagarUsuario()],
      [this.criarUsuarioSession()],
      [this.criarUsuarioSistema()],
      [this.criarFazendasv1()],
      [this.criarUF()],
      [this.criarMunicipio()],
      [this.criarAnimais()]    
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', this.criarUsuarioSession));
  }

}