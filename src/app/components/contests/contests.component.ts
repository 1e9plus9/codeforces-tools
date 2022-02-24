import {Component, OnInit, ViewChild} from '@angular/core';
import {Contest} from "../../../contest";
import {CodeforcesApiService} from "../../services/codeforces-api.service";
import {HttpClientModule} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, MatSortable} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {User} from "../../../user";

@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.css']
})
export class ContestsComponent implements OnInit {

  contests: Contest[] = [];
  displayedColumns: string[] = ['id', 'name'];
  dataSource = new MatTableDataSource(this.contests);
  handle: string = "";
  handleList: User[] = [];

  dataSourceUsers = new MatTableDataSource(this.handleList);
  displayedColumnsUsers: string[] = ['username', 'rating'];

  constructor(public codeforcesApiService: CodeforcesApiService) { }

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  ngAfterViewInit() {

  }

  addHandle(): void {
    this.codeforcesApiService.getUserInfo(this.handle).subscribe(
      res => {
        if (res.status == 'OK') {

          this.handleList.push({
            username: res.result[0].handle,
            rating: res.result[0].rating
          })
        }
        this.dataSourceUsers = new MatTableDataSource<User>(this.handleList);
        console.log('add')

        this.handle = ''
      }
    )
  }

  showContests(): void {
    let banned = new Set();
    for (const user of this.handleList) {
      this.codeforcesApiService.getUserContests(user.username).subscribe( res => {
        if (res.status == "OK") {
          for (const submission of res.result) {
            if (submission.verdict == "OK") {
              banned.add(submission.contestId);
            }
          }
        }
        console.log('here')
        let contests: Contest[] = []
        for (const i of this.contests) {
          if (!banned.has(i.id)) {
            contests.push(i);
          }
        }

        this.dataSource.data = contests
      })
    }

  }

  ngOnInit(): void {

    this.contests = []
    this.handleList = []
    this.codeforcesApiService.getContests().subscribe( res => {
      for (const contest of res.result) {
        if (contest.type == "CF" && contest.phase == "FINISHED") {
          this.contests.push({
            id: contest.id,
            name: contest.name,
            link: "https://codeforces.com/contest/" + contest.id,

          })
        }
      }

      this.dataSource = new MatTableDataSource<Contest>(this.contests)
      this.sort.sort(({ id: 'id', start: 'desc'}) as MatSortable);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;


      console.log('contests')



    } )

  }

}
