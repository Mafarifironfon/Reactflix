import React from 'react';
import {FormGroup, Input, Label} from "reactstrap";

interface TextInputProps {
    name?:string;
    label : string;
    type : string;
    value : string;
    action: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput:React.FC <TextInputProps> = (props: TextInputProps) => {
    return (
        <div>
            <FormGroup>
                <Label for={props.name}>
                    {props.label}
                </Label>
                <input
                    type={props.type}
                    placeholder={props.label}
                    name={props.name}
                    value={props.value}
                    onChange={event => props.action(event)}
                />
            </FormGroup>
        </div>
    );
};

export default TextInput;