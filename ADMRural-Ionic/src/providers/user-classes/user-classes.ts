export class UserClasses {
    public vazio() {
    }
  }
  
  export class Usuario {
    CodigoUsuario: number;
    Email: string;
    Senha: string;
    DD: number;
    Celular: number;
    Nome: string;
    photopath: string;
    hashkey: string;
    connection: string;
  }
  
  export class Lei{
    codigo:number;
    digito:number;
    tipo:string;
    categoria:string;
    descricao_breve:string;
    observacao:string;
    valor:string;
    moeda:string;
    fator:string;
    tipoinfracao:string;
    descricao:string;
    infrator:string;
    amparo:string;
    tipoveiculo:string;
    afericao:string;
    valorinfracao:string;
    veiculo:string;
    cnh:string;
    cla:string;
    mbft:string;
  }
  
  export class ApoioSistema{
    portaria:string;
    nome_sistema:string;
    tempo_gps:number;
    tempo_gps_envio:number;
    tempo_inativo:number;
    cla:string;
    via:string;
    rodovia:string;
    endereco:string;
    obs:string;
    municipio:string;
    orgao:string;
    amarra:string;
    ausente:string;
    mbft:string;
    impressao:string;
    fotos:number;
    video:string;
  }
  
  export class Geral{
    codigo:number;
    uf:string;
    nome:string;
    municipio:number;
    nome_municipio:string;
    codigo_lei:number;
    digito_lei:number;
    afericao:number;
    realizada:string;
    considerada:string;
    limite:string;
    afericao_nome:string;
    pim:string;
    imei:string;
    serie:string;
    sequencia:number;
    espaco:number;
    inicial:number;
    final:number;
    proximo:number;
    finalizado:string;
    aproveita_coordenadas:string
    aproveita_condicao:string;
    aproveita_condutor:string;
    aproveita_municipio:string;
    aproveita_local:string;
    aproveita_tipo_local:string;
    aproveita_local2:string;
    aproveita_bairro:string;
    aproveita_obs:string;
  }
  