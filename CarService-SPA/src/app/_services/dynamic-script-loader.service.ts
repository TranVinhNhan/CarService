import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  // Admin Scripts
  { name: 'admin-jquery', src: '../../assets/admin/vendor/jquery-3.2.1.min.js' },
  { name: 'admin-popperjs', src: '../../assets/admin/vendor/bootstrap-4.1/popper.min.js' },
  { name: 'admin-bootstrap', src: '../../assets/admin/vendor/bootstrap-4.1/bootstrap.min.js' },
  { name: 'admin-slick', src: '../../assets/admin/vendor/slick/slick.min.js' },
  { name: 'admin-wow', src: '../../assets/admin/vendor/wow/wow.min.js' },
  { name: 'admin-animsition', src: '../../assets/admin/vendor/animsition/animsition.min.js' },
  { name: 'admin-bootstrap-progressbar', src: '../../assets/admin/vendor/bootstrap-progressbar/bootstrap-progressbar.min.js' },
  { name: 'admin-counterup-waypoints', src: '../../assets/admin/vendor/counter-up/jquery.waypoints.min.js' },
  { name: 'admin-counterup-jquery', src: '../../assets/admin/vendor/counter-up/jquery.counterup.min.js' },
  { name: 'admin-circle-progress', src: '../../assets/admin/vendor/circle-progress/circle-progress.min.js' },
  { name: 'admin-perfect-scrollbar', src: '../../assets/admin/vendor/perfect-scrollbar/perfect-scrollbar.js' },
  { name: 'admin-chartjs', src: '../../assets/admin/vendor/chartjs/Chart.bundle.min.js' },
  { name: 'admin-select2', src: '../../assets/admin/vendor/select2/select2.min.js' },
  { name: 'admin-main', src: '../../assets/admin/js/main.js' },
  // Client Script
  { name: 'client-animsition', src: '../../assets/fashe-template/vendor/animsition/js/animsition.min.js'},
  { name: 'client-select2', src: '../../assets/fashe-template/vendor/select2/select2.min.js'},
  { name: 'client-slick', src: '../../assets/fashe-template/vendor/slick/slick.min.js'},
  { name: 'client-slickcustom', src: '../../assets/fashe-template/js/slick-custom.js'},
  { name: 'client-countdown', src: '../../assets/fashe-template/vendor/countdowntime/countdowntime.js'},
  { name: 'client-lightbox', src: '../../assets/fashe-template/vendor/lightbox2/js/lightbox.min.js'},
  { name: 'client-sweetalert', src: '../../assets/fashe-template/vendor/sweetalert/sweetalert.min.js'},
  { name: 'client-main', src: '../../assets/fashe-template/js/main.js'}

  // "src/assets/client/vendor/jquery/jquery-3.2.1.min.js",
  // "src/assets/client/vendor/animsition/js/animsition.min.js",
  // "src/assets/client/vendor/bootstrap/js/popper.js",
  // "src/assets/client/vendor/bootstrap/js/bootstrap.min.js",
  // "src/assets/client/vendor/select2/select2.min.js",
  // "src/assets/client/js/custom1.js",
  // "src/assets/client/vendor/slick/slick.min.js",
  // "src/assets/client/js/slick-custom.js",
  // "src/assets/client/vendor/countdowntime/countdowntime.js",
  // "src/assets/client/vendor/lightbox2/js/lightbox.min.js",
  // "src/assets/client/vendor/sweetalert/sweetalert.min.js",
  // "src/assets/client/js/custom2.js",
  // "src/assets/client/js/main.js"
];

declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class DynamicScriptLoaderService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        // load script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  // IE
            script.onreadystatechange = () => {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    script.onreadystatechange = null;
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                }
            };
        } else {  // Others
            script.onload = () => {
                this.scripts[name].loaded = true;
                resolve({script: name, loaded: true, status: 'Loaded'});
            };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

}
