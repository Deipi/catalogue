import React, { Component } from 'react';
import { Field, FieldArray, reduxForm, change } from 'redux-form/immutable'
import validate from './validate'

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Card, CardHeader, Button } from 'reactstrap';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} id="inputs" type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderSubProducts = ({variants, fields, meta: { touched, error, submitFailed } } ) => (
    <ul >
        <div style={{ float: 'left', background: '#f0f0' }}>
            <li>
                <Button type="button" onClick={() => fields.push({})}>Crear</Button>
                {(touched || submitFailed) && error && <span>{error}</span>}
            </li>
        </div>
        <div style={{ float: 'right'}}>
            <Card>
             <CardHeader>Subproductos</CardHeader>
                {fields.map((ProductVariants, index) => (
                    <div>
                        <Card block>
                            <li key={index}>
                                <h4>Variante #{index + 1}</h4>                                
                                {
                                  variants ? variants.map(obj => {
                                    return(
                                      <div>                                        
                                        <Field name={obj.label} type="text" component={ renderField } label={obj.label}/>                                      
                                      </div>
                                    );
                                  }) : null
                                }
                                <Button type="button" onClick={() => fields.remove(index)}>Eliminar</Button>
                            </li>
                        </Card>
                    </div>
                ))}
            </Card>
        </div>
    </ul>
);

class NewProductForm extends React.Component{
    constructor(props){
        super(props);
        this.onChangeActionVariants = this.onChangeActionVariants.bind(this);
    }
    onChangeActionVariants(value, inputName){
        const { dispatch } = this.props;
        dispatch(change('fieldArrays', inputName, value, true))
    }
    render(){
        const { handleSubmit, actionSubmit, pristine, reset, submitting, variants } = this.props;
        return (
            <div>
                <form onSubmit={ handleSubmit(actionSubmit) }>
                    <div style={{ float: 'left'}}>
                        <Field name="name" type="text" component={ renderField } label="Nombre del producto"/>
                        <Field name="code" type="number" component={renderField} label="Código del producto"/>
                        <Field name="price" type="number" component={renderField} label="Precio del producto"/>
                        <label>Descripción</label><br/>
                        <Field 
                          name="description"
                          type="text"
                          component="textarea"
                          placeholder="Descripción"
                        />
                        <Field
                          name="tags"
                          type="input"
                          component={TagsSelect}
                          />                            
                        <label>Variantes</label>
                        <Field name="ProductVariants" 
                            component={ VariansSelect } 
                            type="text" 
                            placeholder="Variantes"
                            onChangeAction={ this.onChangeActionVariants }
                            />                            
                    </div>                    
                    <div style={{ float: 'left'}}>
                        <FieldArray name="variants" component={renderSubProducts} variants={ variants } />
                    </div>
                    <div style={{float:'left'}}>
                        <Button type="submit" disabled={submitting}>Guardar</Button>
                        <Button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
                    </div>
                </form>
            </div>
        );
    }
}

class VariansSelect extends Component{
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
        displayName: 'VariansSelect',
        multi: true,
        multiValue: [
            { value: 'T', label: 'Tamaño' },
            { value: 'C', label: 'Color' }
        ],
        options: [
            { value: 'S', label: 'Sabor' },
            { value: 'E', label: 'Estilo' },
            { value: 'M', label: 'Material' },
            { value: 'T', label: 'Tamaño' },
            { value: 'C', label: 'Color' }
        ],
        value: undefined
    };
  }

  propTypes: {
  hint: React.PropTypes.string,
  label: React.PropTypes.string
  }

  handleOnChange (value) {
  const { multi } = this.state;
  if (multi) {
    this.setState({ multiValue: value });
  } else {
    this.setState({ value });
  }
  }

  render () {
  const { multi, multiValue, options, value } = this.state;
  const{ onChangeAction} = this.props;
  const { name } = this.props.input;
  return (
    <div >
      <h3 >{this.props.label}</h3>
      <Select.Creatable
        multi={multi}
        options={options}
        onChange={(value, algo) => {this.handleOnChange(value); onChangeAction(value, name); } }
        placeholder="VariansSelect"
        value={multi ? multiValue : this.props.input.value}
        name={this.props.input.name}
        { ...this.props}
      />

      <div >{this.props.hint}</div>
    </div>
  );
  }
}

class TagsSelect extends  Component{
  constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {
            displayName: 'TagsSelect',
            multi: true,
            multiValue: [],
            options: [
                { value: 'R', label: 'Ropa' },
                { value: 'E', label: 'Electronica' },
                { value: 'Z', label: 'Zapatos' }
            ],
            value: undefined            
        };
    }

    propTypes: {
        hint: React.PropTypes.string,
        label: React.PropTypes.string
    }

    handleOnChange (value) {
        const { multi } = this.state;
        if (multi) {
          this.setState({ multiValue: value });
        } else {
          this.setState({ value });
        }
    }

  render () {
    const { multi, multiValue, options, value } = this.state;
    return (
      <div >
        <h3 >{this.props.label}</h3>
        <Select.Creatable
          multi={multi}
          options={options}
          onChange={this.handleOnChange}
          value={multi ? multiValue : value}
          placeholder="Tags"
        />
        <div >{this.props.hint}</div>
        
      </div>
    );
  }
}

class Size extends Component{
    constructor(props) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {
            displayName: 'Size',
            multi: false,
            multiValue: [],
            options: [
                { value: 'C', label: 'Chico' },
                { value: 'M', label: 'Mediano' },
                { value: 'G', label: 'Grande' }
            ],
            value: undefined
        };
    }

  propTypes: {
    hint: React.PropTypes.string,
    label: React.PropTypes.string
  }

  handleOnChange (value) {
    const { multi } = this.state;
    if (multi) {
      this.setState({ multiValue: value });
    } else {
      this.setState({ value });
    }
  }

  render () {
    const { multi, multiValue, options, value } = this.state;
    return (
      <div >

        <h3 >{this.props.label}</h3>
        <Select.Creatable
          multi={multi}
          options={options}
          onChange={this.handleOnChange}
          placeholder="Tamaño"
          value={multi ? multiValue : value}
        />

        <div >{this.props.hint}</div>
      </div>
    );
  }
}


export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  validate,
})(NewProductForm);

