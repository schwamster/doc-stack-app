import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { USERSERVICE, IUserService, LogonResult } from '../services';
import { FileUpload } from '../shared';
import { UploadRejected } from 'ng2-uploader/src/services/ng2-uploader';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
    private zone: NgZone;
    uploads: { [name: string]: FileUpload; } = {};
    fileToUpload = '';
    hasBaseDropZoneOver: boolean = false;
    options: Object;
    errors: string[] = [];
    private userService: IUserService;
    constructor( @Inject(USERSERVICE) userService: IUserService) {
        this.userService = userService;
    }

    ngOnInit() {
        this.zone = new NgZone({ enableLongStackTrace: false });
        this.options = {
                //TODO: remove hard coded url!
                url: 'http://localhost:3002/api/upload',
                filterExtensions: true,
                allowedExtensions: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'application/pdf'],
                authToken: "asdf",  
                authTokenPrefix: "Bearer"
            };

        return this.userService.getUser().then((user) => {
            Object.assign(this.options, { authToken : user.access_token});
        });

    }

    handleUploadRejected(data: UploadRejected): void {
        if (data.reason === UploadRejected.EXTENSION_NOT_ALLOWED) {
            this.errors.push(`File ${data.file.name} could not be uploaded, because the extension is not allowed.`);
        } else {
            this.errors.push(`File ${data.file.name} could not be uploaded => ${data.reason}`);
        }
    }

    handleUpload(data): void {
        this.zone.run(() => {
            this.fileToUpload = '';


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
                } catch (e) {
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