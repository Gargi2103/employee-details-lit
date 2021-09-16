import { LitElement, html, css } from "lit-element";

class InfoPage extends LitElement {
    static get properties() {
        return {
          employeeStatus: {type: Object},
          activeClicked: {type:Boolean},
          inactiveClicked: {type:Boolean},
          showTotalEmp: {type:Boolean},
          showEmpEmail: {type:Boolean},
          showCount: {type:Array},
          showCountTd: {type:Array},
          employeeRowClick: {type:Boolean},
          showEmployeeDetails: {type:Boolean},
          empClicked: {type: Object},
          showEmpList: {type: Boolean},
        };
    }
    
    constructor() {
        super();
        this.activeClicked = false;
        this.inactiveClicked = false;
        this.showTotalEmp = false;
        this.showEmpEmail = false;
        this.showCount = [];
        this.showCountTd = [];
        this.employeeRowClick = false;
        this.showEmployeeDetails = false;
        this.empClicked;
        this.showEmpList = true;

        /* this.employeeStatus = [
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
        ];  */
            
    }

    static get styles(){
        return css `
            p {
                margin-left: 200px;
            }
            table {
                width: 78%;
                margin: 40px;
                border-spacing: 0;

            }
            table th {
                background-color: rgb(237, 240, 241);
                height: 15px;
                text-align: left;
                font-family: Arial;
                font-size: 15px;
                font-weight: bold;
                padding: 10px
            }
            table td {
                padding: 10px;
            }
            .count-td {
                background-color: red;
                height: 2px;
                width: 8px;
                border-radius: 30%;
                display: inline-block;
                line-height: 2px;
            }
            .nav-button-container{
                margin: 40px;
            }
            .nav-button {
                border: none;
                background-color: #fafafa;
                color: rgb(106 103 103);
                font-family: arial;
                font-weight: 400;
                font-size: 14px;
                padding: 10px;
            }
            .nav-button:active, .nav-button:focus  {
                border-bottom: 2px solid #c6c3c3;
            }
            .employee-count-wrapper {
                padding: 20px;
                text-align: left;
            }
            .employee-label{
                color: #bab7b7;
                font-family: arial;
                font-size: 16px;
            }
            .employee-count {
                color: #0c7cef;
                font-family: arial;
                font-weight: bold;
                font-size: 22px;
            }
            .button-container {
                margin-left: 40px;
            }
            .button {
                padding: 10px;
                background: #3b8cf1;
                color: white;
                font-family: arial;
                font-weight: normal;
                font-size: 14px;
                border: none;
                border-radius: 5px;
            }
            .hideInfo {
                display: none;
            }
        `;
    }
    handleActive(e){
        console.log("Active clicked");
        this.inactiveClicked = false;
        this.activeClicked = true;
        
    }
    handleInactive(e){
        console.log("Active clicked");
        this.activeClicked = false;
        this.inactiveClicked = true;
    }
    getTotalEmp(e){
        this.totalEmp = `${this.employeeStatus.length}`;
        this.showEmpEmail = false;
        this.showTotalEmp = true;
        console.log("totalEmp=",this.totalEmp);
    }
    getEmpEmail(e){
        this.showTotalEmp = false;
        this.showEmpEmail = true;
    };
    handleEmployeeRowClick(item, target){
               
        var keyClicked = target.parentNode.getAttribute("key");

        // Code to get the Counter for each employee row being clicked starts
        for(let i=item; i<=item ; ++i){
            this.showCountTd[i] = true;
            if (this.showCount[i]=== undefined){
                this.showCount[i]=0;
            }
            this.showCount[i]= ++this.showCount[i];
                console.log("showCount[i] 222",this.showCount[i]);
        }
        // Code to get the Counter for each employee row being clicked ends

        this.empClicked ={...this.employeeStatus[keyClicked]}; // Passing value of clicked employee into the child component for details
        
        this.showEmpList = false; //for hiding/showing the employee list page
        this.showEmployeeDetails = true; //for hiding/showing the employee details page
        
    }; 
    callbackFromEmployeeDetails(event){
        console.log("Inside callbackFromEmployeeDetails");
        console.log(event.returnValue);
        this.showEmployeeDetails = false;
        this.showEmpList = event.returnValue;        
    }
    
    render(){
        return html `
        ${this.showEmpList ? html `<div class="info-content">
            <div class="nav-button-container">
                <button @click="${this.handleActive}" class="nav-button">Active</button>
                <button @click="${this.handleInactive}" class="nav-button">Inactive</button>
            </div>
            ${this.activeClicked ? html`<table id="active">
                <tr>
                    <th>Employee Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th></th>
                </tr>
                ${Object.keys(this.employeeStatus).map(item => html` 
                    ${(this.employeeStatus[item].status === "active") ? html `<tr key="${item}" @click="${(e) => this.handleEmployeeRowClick(item, e.target)}">
                        <td>${this.employeeStatus[item].EmpId}</td>
                        <td>${this.employeeStatus[item].FirstName}</td>
                        <td>${this.employeeStatus[item].LastName}</td>
                        <td>${this.employeeStatus[item].Phone}</td>
                        ${this.showCountTd[item] ? html `<td class="count-td">${this.showCount[item]}</td>`: ""}
                    </tr>` : ""}
                `)}
            </table>` : ""}
            ${this.inactiveClicked ? html `<table id="inactive">
                <tr>
                    <th>Employee Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                </tr>
                ${Object.keys(this.employeeStatus).map(item => html` 
                    ${(this.employeeStatus[item].status === "inactive") ? html `<tr>
                        <td>${this.employeeStatus[item].EmpId}</td>
                        <td>${this.employeeStatus[item].FirstName}</td>
                        <td>${this.employeeStatus[item].LastName}</td>
                        <td>${this.employeeStatus[item].Phone}</td>
                    </tr>` : ""}
                `)}
            </table>`:""}
            <div class="button-container">
                <button @click="${this.getTotalEmp}" class="button">Get Total Employees</button>
                <button @click="${this.getEmpEmail}" class="button">Get Employee Emails</button>
                ${this.showTotalEmp ? html `<div class="employee-count-wrapper">
                <span class="employee-label">Total Employees :</span>
                <span class="employee-count">${this.totalEmp}</span>
                </div>` : ""}
                ${this.showEmpEmail ? html `<ul>
                    ${Object.keys(this.employeeStatus).map(item => html
                            `<li>${this.employeeStatus[item].EmailId}</li>`
                    )}
                </ul>` : ""}
            </div>            
        </div>`:""}  
        ${this.showEmployeeDetails ? html`
            <employee-details @event-fired=${this.callbackFromEmployeeDetails}
                .empId=${this.empClicked.EmpId} 
                .firstName=${this.empClicked.FirstName} 
                .lastName=${this.empClicked.LastName} 
                .phone=${this.empClicked.Phone} 
                .emailId=${this.empClicked.EmailId} 
                .status=${this.empClicked.status}
                .empObject=${this.empClicked}
                .showEmpList=${this.showEmpList}
                .showEmpDetails=${this.showEmployeeDetails}
                >
            </employee-details>
        `:""}
        `;
    }
}

class EmployeeDetails extends LitElement {
    static get properties() {
        return {
            empId: {type: Number},
            firstName: {type: String},
            lastName: {type: String},
            phone: {type: String},
            emailId: {type: String},
            status: {type: String},
            empObject: {type: Object},
            showEmpDetails: {type: Boolean},
            clickCount: {type: Number},
            trClicked: {type:String}

        };
    }
    /* constructor() {
        super();
        this.showEmpDetails = true;
    } */
    static get styles(){
        return css `
            .employee-details-wrapper {
                margin: 30px;
            }
            .employee-header {
                color: #004eff;
                font-family: cursive;
                font-weight: 100;
            }
            .details-wrapper {
                padding: 20px;
            }
            .link-container {
                display: flex;
                flex-direction: row-reverse;
            }
            .link-container a {
                color: blue;
            }
            .details {
                display: flex;
                flex-direction: row;
                font-family: sans-serif;
                color: #767474;
                font-weight: bold;
                font-size: 14px;
            }
            .photo-image {
                display: flex;
            }
            .details ul {
                list-style-type: none;
                margin: 0px;
                padding-left: 5px;
            }
            .details ul li {
                padding: 15px 15px 15px 0;
            }
            .details ul li span {
                margin-right: 10px;
            }
            .details > ul:nth-child(2) {
                font-weight: normal;
                border-right: 1px solid rgb(234 236 239 / 78%);
            }
            .hideInfo {
                display: none;
            }
        `;
    }

    backToInfoList(target){
        console.log("backToInfoList",this.showEmpList);
        //this.showEmpDetails = false;
        //target.closest('div[class="employee-details-wrapper"]').setAttribute("class", "hideInfo");
        this.dispatchEvent (
            new CustomEvent("event-fired",{returnValue: true})
        );
    }

    render(){
        return html `
        ${this.showEmpDetails ? html `<div class="employee-details-wrapper">
            <h2 class="employee-header">${this.firstName} ${this.lastName}</h2>
            <div class="details-wrapper">
                <div class="link-container">
                    <a @click=${(e) => this.backToInfoList(e.target)}>Go Back</a>
                </div>
                <div>
                    <div class="details">                        
                        <ul>${Object.keys(this.empObject).map(item => html`
                                <li> <span>${item}</span> </li>
                            `)}
                        </ul>
                        <ul>${Object.keys(this.empObject).map(item => html`
                                <li> 
                                    <span> : </span>
                                    <span>${this.empObject[item]}</span>
                                </li>
                            `)}
                        </ul>
                    </div>
                    <div class="photo-image">
                        <i class="fal fa-user-circle"></i>
                    </div>
                </div>
            </div>
        </div>
        `: ""}
        `;
    }
}

customElements.define('info-page', InfoPage);
customElements.define('employee-details', EmployeeDetails);