import { Component, OnInit } from '@angular/core';
import { Publication } from '../../entities/publication';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UserServerService } from 'src/services/user-server.service';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/shared/auth.state';
import { User } from '../../entities/user';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  displayedColumns: string[] = ['id','nazov','actions'];
  publications = [];
  constructor(private dialog: MatDialog, private userServerService: UserServerService, private store: Store) { }
  dataSource = new MatTableDataSource<Publication>();
  profileUser: User;

  ngOnInit() {

    this.userServerService.getUser().subscribe(user=> {
      this.profileUser = user;
      this.profileUser.id = user.id;
      this.profileUser.email = user.email;
      this.profileUser.name = user.name;
      this.profileUser.surname = user.surname;
    })

    //toto odkomentovat ked bude hotova servisa na ziskanie publikacii
    // this.userServerService.getPublications(this.store.selectSnapshot(AuthState.id)).subscribe(publications => {//tu poslat este aj id pouzivatela
    //   this.dataSource.data = publications;
    // });
  }

  showuser(){
    console.log(this.profileUser.id + "nieco ine " + this.profileUser.email + " " + this.profileUser.name);
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '40%',
      data: {name: this.profileUser.name, surname: this.profileUser.surname, email: this.profileUser.email}
    });


    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // //update user tu:
//vrati spravny vysledok ale neprekresli sa

// this.userServerService.getUser();
      console.log(result);
      
    });
  }





  deletePublication(publication: Publication) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {
      title: "Vymazanie publikacie",
      message: "Naozaj vymazat publikaciu s nazvom " + publication.nazov + "?"
    }});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.userServerService.deletePublication(publication).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(p => p != publication);
        });
      }
    })
  }
}
