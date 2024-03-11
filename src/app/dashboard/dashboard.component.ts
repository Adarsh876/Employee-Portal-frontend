import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/services/adminapi.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showSideBar:boolean = true
  employeeCount:number = 0
  selected: Date | null = new Date()

  adminName:any = ""

  adminDetails:any = {}


  Highcharts: typeof Highcharts = Highcharts;
  profileImage:string = "./assets/images/user.jpg"
  editAdminStatus:boolean = false

  chartOptions = {}

  constructor(private api:AdminapiService){
    this.chartOptions = {
      
    chart: {
      type: 'pie'
  },
  title: {
      text: 'Project Completion Report'
  },
  tooltip: {
      valueSuffix: '%'
  },
  plotOptions: {
      series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
              enabled: true,
              distance: 20
          }, {
              enabled: true,
              distance: -40,
              format: '{point.percentage:.1f}%',
              style: {
                  fontSize: '1.2em',
                  textOutline: 'none',
                  opacity: 0.7
              },
              filter: {
                  operator: '>',
                  property: 'percentage',
                  value: 10
              }
          }]
      }
  },
  credits: {
    enabled:false
  },
  series: [
      {
          name: 'Project',
          colorByPoint: true,
          data: [
              {
                  name: 'Brave',
                  y: 55.02
              },
              {
                  name: 'FireFox',
                  sliced: true,
                  selected: true,
                  y: 26.71
              },
              {
                  name: 'Chrome',
                  y: 1.09
              },
              {
                  name: 'MicrosoftEdge',
                  y: 15.5
              },
              {
                  name: 'DuckDuckGo',
                  y: 1.68
              }
          ]
      }
  ]

    }
    HC_exporting(Highcharts)
  }

  ngOnInit(): void {
    if(localStorage.getItem("name")){
      this.adminName = localStorage.getItem("name")
    }
    this.totalEmployee()

    //fetch all admin details
    this.api.authorization().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.adminDetails = res
        if(res.picture){
          this.profileImage = res.picture
        }
        
      }
    })
  }

  menuBar(){
    this.showSideBar = !this.showSideBar
  }

  totalEmployee(){
    this.api.getAllEmployeeApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.employeeCount = res.length
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })

  }

  edit(){
    this.editAdminStatus = true

  }

  getFile(event:any){
    let fileDetails = event.target.files[0]
    console.log(fileDetails);

    // create a new object for fileReader() class
    let fr = new FileReader()
    //read
    fr.readAsDataURL(fileDetails)
    //convert
    fr.onload = (event:any)=>{
      console.log(event.target.result);
      this.profileImage = event.target.result
      this.adminDetails.picture = this.profileImage
      
    }
    

  }

  updateAdmin(){
    this.api.updateAdminApi(this.adminDetails).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert('Updated successfully')
        localStorage.setItem("name",res.name)
        localStorage.setItem("name",res.password)
        this.adminName = localStorage.getItem("name")
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  cancel(){
    this.api.authorization().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.adminDetails = res
        if(res.picture){
          this.profileImage = res.picture
        }
        
        this.editAdminStatus = false
      }
    })

  }

}
