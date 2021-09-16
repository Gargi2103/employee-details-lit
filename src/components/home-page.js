import { LitElement, html, css } from "lit-element";

class HomePage extends LitElement {

    static get properties(){
        return {
            employeeStatus: {type: Object},
            employeeStatusCounterActiveFlag: {type: Number},
            employeeStatusCounterInActiveFlag: {type: Number},
            employeeActivePer: {type: Number},
            employeeInActivePer: {type: Number}
        };
    }

    constructor() {
        super();
        this.employeeStatusCounterActiveFlag = 0;
        this.employeeStatusCounterInActiveFlag = 0;
        this.employeeActivePer = 0;
        this.employeeInActivePer = 0;
    }

    employeeStatusCounterActive = function employeeStatusCounterActive(){
        Object.keys(this.employeeStatus)
           .map(item => {
                console.log("item",item)
                if(this.employeeStatus[item].status === "active"){
                    ++this.employeeStatusCounterActiveFlag;
                }
            }
           )
           console.log("this.employeeStatusCounterActive Outer",this.employeeStatusCounterActiveFlag);
           this.employeeActivePer = (this.employeeStatusCounterActiveFlag/this.employeeStatus.length)*100;
           return [parseFloat(this.employeeActivePer).toFixed(2)];
    };
    employeeStatusCounterInActive = function employeeStatusCounterInActive(){
        Object.keys(this.employeeStatus)
           .map(item => {
                console.log("item",item)
                if(this.employeeStatus[item].status === "inactive") {
                    ++this.employeeStatusCounterInActiveFlag;
                }
            }
           )
           console.log("this.employeeStatusCounterInActive Outer",this.employeeStatusCounterInActiveFlag);
           this.employeeInActivePer = (this.employeeStatusCounterInActiveFlag/this.employeeStatus.length)*100;
           return [parseFloat(this.employeeInActivePer).toFixed(2)];
    };
    static get styles(){
        return css `
            .piechart {
                margin-top: 50px;
                margin-right: 100px;
                display: block;
                width: 200px;
                height: 200px;
                border-radius: 50%;
                background-image: conic-gradient(
                    red 70deg, 
                    rgb(68 66 173) 0 235deg);
            }
            .pie-wrapper,
                .piechart {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
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
            .dot {
                height: 10px;
                width: 10px;
                border-radius: 50%;
                display: inline-block;
            }
            .dot-red {
                background-color: red;
            }
            .dot-blue {
                background-color: rgb(68 66 173);
            }
            .dot-blue-wrap{
                display: flex;
                padding: 5px;
            }
            .dot-red-wrap{
                display: flex;
                padding: 5px;
            }
            .dots{
                display: flex;
                flex-direction: column;
            }
            .dots span {
                padding: 5px;
            }
            .dots .dot-red-text, .dots .dot-blue-text {
                padding-top: 0;
            }
            .inactiveVal{
                color: white;
                position: absolute;
                top: 35px;
                right: 40px;
                font-family: monospace;
                font-size: 12px;
            }
            .activeVal{
                color: white;
                position: absolute;
                left: 25px;
                bottom: 65px;
                font-family: monospace;
                font-size: 12px;
            }
        `;
    }

    render(){
        return html `
        <div class="main-content">
            <div class="employee-count-wrapper">
                <span class="employee-label">Total Employees :</span>
                <span class="employee-count">${this.employeeStatus.length}</span>
            </div>
            <div class="pie-wrapper">
                <div class="piechart"> 
                    <span class="activeVal">${this.employeeStatusCounterActive()}%</span>
                    <span class="inactiveVal">${this.employeeStatusCounterInActive()}%</span>
                </div>
                <div class="dots">
                    <div class="dot-red-wrap">
                        <span class="dot-red dot"></span>
                        <span class="dot-red-text">Inactive</span>
                    </div>
                    <div class="dot-blue-wrap">
                        <span class="dot-blue dot"></span>
                        <span class="dot-blue-text">Active</span>
                    </div>
                </div>
            </div> 
        </div>   
        `;
    }
}
customElements.define('home-page', HomePage);