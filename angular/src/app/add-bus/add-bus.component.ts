import { Marque } from './../model/marque.model';
import { Component, OnInit } from '@angular/core';
import { Bus } from '../model/bus.model';
import { BusService } from '../services/bus.service';
import { Router } from '@angular/router';
import { Image } from '../model/image.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.css']
})
export class AddBusComponent implements OnInit {
newBus = new Bus();
marques : Marque[]= [];
newIdMar! : number;
newMarque! : Marque;
marque! : any;
uploadedImage!: File;
imagePath: any;



  constructor(private busService: BusService,
              private router :Router) { }

  ngOnInit(): void {
     /*this.busService.listeMarques();*/
     this.busService.listeMarques().
     subscribe(marques => {this.marque = marques;
     console.log(marques);
     });
     
     }


  
  /*addBus() {
  
    this.busService.consulterMarque(this.newIdMar);
    this.newBus.marque = this.newMarque;
    this.busService.ajouterBus(this.newBus);
    this.router.navigate(['bus']);
    }*/

    // ajouterBus() {
    //   const marque = this.marque.find(marque => marque.idMarque == this.newIdMar)!;
    //   this.newBus.marque = marque;
    //   this.busService.ajouterBus(this.newBus).subscribe(bus => {
    //     console.log(bus);
    //     this.router.navigate(['bus']);
    //   });
    // }

    // ajouterBus() {
    //   this.busService
    //   .uploadImage(this.uploadedImage, this.uploadedImage.name)
    //   .subscribe((img: Image) => {
    //   this.newBus.image=img;
    //   const marque = this.marque.find(marque => marque.idMarque == this.newIdMar)!;
    //   this.newBus.marque = marque;
      
    //   this.busService.ajouterBus(this.newBus).subscribe(bus => {
    //     console.log(bus);
    //     this.router.navigate(['bus']);
    //   });
    // });

    // }

    ajouterBus() {
      this.busService.uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => {
          this.imagePath = img.idImage;
          console.log(img);
          this.newBus.image = img;
          this.newBus.marque = this.marque.find(marque => marque.idMarque == this.newIdMar)!;
    
          this.busService.ajouterBus(this.newBus).subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'Le bus a été ajouté avec succès!',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['bus']);
              }
            });
          }, (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur est survenue lors de l\'ajout du bus.'
            });
          });
        });
    }
    
    onImageUpload(event: any) {
      this.uploadedImage = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = (_event) => { this.imagePath = reader.result; }
      }
      
    
    


}

