import React, {Component} from "react";
import { IntlProvider } from 'react-intl';
import Spanish from "../../languages/es.json";
import English from "../../languages/en.json";
import Portuguese from "../../languages/por.json";

export const Context = React.createContext();
export const ContextConsumer = Context.Consumer

export class IntlWrapper extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            messages: English,
            locale: "en"
        };

        this.locale = 'en';
    }

    selectLanguage = e => {
        const newLocale = e.target.value;
        this.setState({locale: newLocale});
        switch(newLocale){
            case "en":
                    this.setState({messages: English});
                    break;
            case "es": 
                    this.setState({messages: Spanish});
                    break;
            case "por": 
                    this.setState({messages: Portuguese});
                    break;
            default:
                    this.setState({messages: English})
        }
    }
    
    render(){
        const {locale, selectLanguage} = this;
        return(
            <Context.Provider value={{locale, selectLanguage}}>
                <IntlProvider messages={this.state.messages} locale={locale}>
                    {this.props.children}
                </IntlProvider>
            </Context.Provider>
        )
    }
}