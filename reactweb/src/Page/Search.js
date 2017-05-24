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
			<div>
			<CellsTitle>搜索</CellsTitle>
            <Form>
                <FormCell select selectPos="after">
                	 <CellHeader>
                        <Label>出发地</Label>
                    </CellHeader>
                    <CellBody>
                        <Select defaultValue="140100">
                            <option value="141124">临县</option>
							<option value="140100">太原</option>
							<option value="141102">离石</option>
                        </Select>
                    </CellBody>
                </FormCell>
                <FormCell select selectPos="after">
                    <CellHeader>
                        <Label>目的地</Label>
                    </CellHeader>
                    <CellBody>
                        <Select defaultValue="141124" data={[
                            {
                                value: 141124,
                                label: '临县'
                            },
                            {
                                value: 140100,
                                label: '太原'
                            },
                            {
                                value: 141102,
                                label: '离石'
                            }
                        ]} />
                    </CellBody>
                </FormCell>
                <Button>搜索拼车信息</Button>
            </Form>
            </div>

			)
	}

	
}