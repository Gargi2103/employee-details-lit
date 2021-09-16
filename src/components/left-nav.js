import { LitElement, html, css } from "lit-element";
import './info-page.js';
import './home-page.js';

class LeftNav extends LitElement {
    static get properties() {
        return {
          infoClickedVal: {type:Boolean},
          homeClickedVal: {type:Boolean},
          topNavVal: {type:String}
        };
      }
    
    constructor() {
        super();
        this.infoClickedVal = false;
        this.homeClickedVal = true;
        this.topNavVal = "Home";
        this.employeeStatus = [
          { 
            "EmpId":"001",
            "FirstName" : "Sheldon",
            "LastName" : "Cooper",
            "Phone" : "+1 562 102554",
            "EmailId" : "sheldon.cooper@hcl.com",
            "status" : "active"
          },
          {
            "EmpId":"002",
            "FirstName" : "Leonard",
            "LastName" : "Hofstadar",
            "Phone" : "+1 782 108554",
            "EmailId" : "leonard.hofstadar@hcl.com",
            "status" : "active"
          },
          {
              "EmpId":"003",
              "FirstName" : "Penny",
              "LastName" : "Hofstadar",
              "Phone" : "+1 212 132554",
              "EmailId" : "penny.hofstadar@hcl.com",
              "status" : "inactive"
            }
      ]; 
    }
    static get styles() {
        return css `
        .main {
          margin-left: 15%;
          font-size: 16px;
          position: fixed;
          top: 0;
          width: 85%;
          margin-bottom: 40px;
          
        }
        .topnav {
          height: 30px;
          background-color: rgb(59, 140, 241);
          color: rgb(255, 255, 255);
          text-align: left;
          padding: 10px;
          font-family: arial;
          line-height: 30px;
        }
        .sidenav {
            width: 15%;
            position: fixed;
            z-index: 1;
            left: 10px;
            height: 100%;
            background: #fff;
            overflow-x: hidden;
            border-right: 1px solid rgb(212 214 217 / 78%);
            box-shadow: rgb(231 231 231) 1px -1px 8px 0px;
            top: 0;
            padding-top: 10px;
          }
          .sidenav h3 {
            margin-top: 0;
            margin-bottom: 6px;
            color: #3b8cf1;
            font-family: arial;
            padding-left: 16px;
          }
          .sidenav a {
            padding: 18px 8px 6px 16px;
            text-decoration: none;
            font-size: 25px;
            color: #000;
            display: block;
            font-size: 14px;
            font-family: arial;
          }
          
          .sidenav a:hover {
            color: #064579;
          }       
        `;
    }
    homeClicked(e){
        console.log("Home is Clicked");
        this.infoClickedVal = false;
        this.homeClickedVal = true;
        this.topNavVal = "Home";
    };

    infoClicked(e){
        console.log("Info is Clicked");
        this.homeClickedVal = false;
        this.infoClickedVal = true;
        this.topNavVal = "Info";

        localStorage.setItem("activeVal","");
        localStorage.setItem("inactiveVal","");
        localStorage.setItem("totalEmpCount","");
      };
 
    render (){
        return html `
            <div class="sidenav">
                <h3>Employee App</h3>
                <a @click="${this.homeClicked}">Home</a>
                <a @click="${this.infoClicked}">Info</a>
            </div>
            <div class="main">
              <div class="topnav">${this.topNavVal}</div>
              ${this.homeClickedVal ? html `<home-page .employeeStatus=${this.employeeStatus}></home-page>`: ""}
              ${this.infoClickedVal ? html `<info-page .employeeStatus=${this.employeeStatus}></info-page>`: ""}
            </div>
        `;
    }
}

customElements.define('left-nav', LeftNav);