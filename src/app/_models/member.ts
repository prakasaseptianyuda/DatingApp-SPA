import { Photo } from "./photo";

export interface Member {
    userId:number;
    username: string;
    photoUrl: string;
    age: number;
    knownAs: string;
    lastActive: string;
    gender: string;
    introduction: string;
    lookingFor: string;
    interest: string;
    city: string;
    country: string;
    photos: Photo[];
    createdDate: string;
    createdBy: string;
    updatedDate: string;
    updatedBy: string;
}