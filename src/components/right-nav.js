import { LitElement, html, css } from "lit-element";


class RightNav extends LitElement {
    static get styles(){
        return css `
        .main {
            margin-left: 200px;
            font-size: 16px;
            position: fixed;
            top: 0;
            width: 100%;
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
          p {margin-top: 0;}
        `;
    }
    render(){
        return html `
        <div class="main">
            <div class="topnav">Home</div>
        </div>
        `;
    }
}
customElements.define('right-nav', RightNav);