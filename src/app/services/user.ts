import { Character } from "./character";

export interface User{
    id:number,
    email:string,
    username:string,
    imageUrl:string,
    // role:number,
    key?:string,
    gdrCharacters? :Character[]
}