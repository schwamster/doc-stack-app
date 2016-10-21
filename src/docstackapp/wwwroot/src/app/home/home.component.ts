import { Component } from '@angular/core';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    message = 'Have fun working on doc-stack-app!';
    fileToUpload = "";
    uploading = false;
    uploadFile: any;
    hasBaseDropZoneOver: boolean = false;
    options: Object = {
        url: '/api/upload'
    };

    handleUpload(data): void {
        this.uploading = true;
        this.fileToUpload = "";
        if (data && data.originalName)
        {
            
            this.fileToUpload = data.originalName;
            this.hasBaseDropZoneOver = false;
        }
        
        //console.log(JSON.stringify(data));
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
            this.uploading = false;
        }
    }

    fileOverBase(e: any): void {
        console.log(e);
        this.hasBaseDropZoneOver = e;
    }

}
