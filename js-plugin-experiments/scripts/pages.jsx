import React, {Component} from 'react';
import {extensionPointStore, ExtensionPoint} from './blue-ocean';

function PiplineListHeader(props) {
    return <h2>{props.pipelines.length} Pipelines</h2>;
}

var pipelines = [
    {name:"Alpha", status:"green"},
    {name:"Bravo", status:"green"},
    {name:"Charlie", status:"red"},
    {name:"Spaz", status:"green"}
];

/** My first extension */
class MyPipelineRowExtension extends Component {
    render() {
        return <div className={'pipelineStatus_'+this.props.pipeline.status}>{this.props.pipeline.status}</div>
    }
}
extensionPointStore.addExtension("jenkins.pipeline.pipelineRow", MyPipelineRowExtension);


/** My bad extension to show handling of failures */
class MyBadExtension extends Component {
    render() {        
          if (shizzle.nizzle) { // oh dear, there is no shizzle or nizzle
              return 
                <div className={'pipelineStatus_'+this.props.pipeline.status}>{this.props.pipeline.status}</div>
          }          
    }
}
extensionPointStore.addExtension("jenkins.pipeline.pipelineRow", MyBadExtension);



function renderHomepagePipeline(pipeline) {
    return <div key={pipeline.name}>
        <h3>{pipeline.name}</h3>
        <ExtensionPoint name="jenkins.pipeline.pipelineRow" pipeline={pipeline}/>
    </div>
}

export class HomePage extends Component {
    render() {
        return <article>
            <h1>Home</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto autem deleniti, dicta
                exercitationem explicabo facere harum hic inventore laborum magnam magni maiores molestias nemo
                recusandae rem saepe! Illo, perferendis?</p>


            <PiplineListHeader pipelines={pipelines}/>
            {pipelines.map(renderHomepagePipeline)}

        </article>
    }
}

export class AboutPage extends Component {
    render() {
        return <article>
            <h1>About</h1>
            <p>
                Jenkins is an award-winning, cross-platform, continuous integration and continuous delivery application
                that increases your productivity. Use Jenkins to build and test your software projects continuously
                making it easier for developers to integrate changes to the project, and making it easier for users to
                obtain a fresh build. It also allows you to continuously deliver your software by providing powerful
                ways to define your build pipelines and integrating with a large number of testing and deployment
                technologies.
            </p>
        </article>
    }
}

class AlienPageSubMenu extends Component {
    render() {
        return <div>
        <ExtensionPoint name="jenkins.pipeline.alienPageSubMenu" />
        </div>
    }
}
extensionPointStore.addExtension("jenkins.pipeline.alienPageHome", AlienPageSubMenu);

class AlienLairLink extends Component {
    render() {
        return <div>
            <a href="#">This is a link to the lair</a>
        </div>;
    }
}
extensionPointStore.addExtension("jenkins.pipeline.alienPageSubMenu", AlienLairLink);

export class AlienPage extends Component {
    render() {
        return <article>
            <h1>This is the third page with a dynamic menu</h1>
            <div className="subMenu">
                <ExtensionPoint name="jenkins.pipeline.alienPageHome" />
            </div>
        </article>
    }
}

// TODO: Replace this with a "plugin container" component that also knows about routes

export class NotFoundPage extends Component {
    render() {
        console.log("Rendering NotFoundPage, props", this.props);
        return <article>
            <h1>Not found</h1>
            <p>This route (<strong>{this.props.location.pathname}</strong>) is not currently mapped to anything :(</p>
            <p><img src="/resources/hawhaw.gif"/></p>
        </article>
    }
}
