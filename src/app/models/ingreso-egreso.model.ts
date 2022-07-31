export class IngresoEgreso{
  constructor(
    public decripcion:string,
    public monto:number,
    public tipo:string,
    public uid?:string,
  ){
    
  }
}