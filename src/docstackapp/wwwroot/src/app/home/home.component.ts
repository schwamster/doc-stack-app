import { Component, OnInit, NgZone } from '@angular/core';
import { FileUpload } from '../shared';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    private zone: NgZone;
    uploads: { [name: string]: FileUpload; } = {};
    fileToUpload = "";
    hasBaseDropZoneOver: boolean = false;
    options: Object;

    ngOnInit() {
        this.zone = new NgZone({ enableLongStackTrace: false });
        this.options = {
            url: '/api/upload',
            filterExtensions: true,
            allowedExtensions: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'application/pdf']
        };
    }

    handleUpload(data): void {
        this.zone.run(() => {
            this.fileToUpload = "";
            if (data && data.originalName) {
                let fileUpload = new FileUpload(data.originalName, true, false, data.progress.percent);
                this.uploads[data.originalName] = fileUpload;
                this.fileToUpload = data.originalName;
                this.hasBaseDropZoneOver = false;
            }

            if (data && data.response) {
                let fileUpload: FileUpload = { name: data.originalName, uploading: false, success: false, progress: 100 };

                try {
                    data = JSON.parse(data.response);
                    fileUpload.success = data;
                }
                catch (e) {
                    fileUpload.success = false;
                }

                this.uploads[fileUpload.name] = fileUpload;
            }
        });
    }

    fileOverBase(e: any): void {
        console.log(e);
        this.hasBaseDropZoneOver = e;
    }

}
