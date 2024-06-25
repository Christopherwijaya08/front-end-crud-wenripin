export class NotesModel {
    id: number;
    title: string;
    content: string;
    createdBy: string;
    createdAt: string;
    clicked: boolean;

    constructor(data: any= {}){
        this.id = data.id || null;
        this.title = data.title || null;
        this.content = data.content || null;
        this.createdBy = data.createdBy || null;
        this.createdAt = data.createdAt || null;
        this.clicked = data.clicked || false;
    }
}