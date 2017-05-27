import React, { Component } from 'react';
import WeUI from 'react-weui';
const { 
	ButtonArea,
    Button,
    CellsTitle,
    CellsTips,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Form,
    FormCell,
    Icon,
    Input,
    Label,
    TextArea,
    Switch,
    Radio,
    Checkbox,
    Select,
    VCode,
    Agreement,
    Toptips
}=WeUI;
export default class Search extends Component {
	constructor(args) {
		// code
		super(args)
	}

	render ()
	{
		return (
			 <Tab type="navbar">
                 <NavBarItem label="Nav1">
                    
                 </NavBarItem>
                <NavBarItem label="Nav2">
                   
                </NavBarItem>
                <NavBarItem label="Nav3">
                    
                </NavBarItem>
            </Tab>

			)
	}

	
}