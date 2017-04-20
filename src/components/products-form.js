import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable'
import validate from './validate'

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Card, CardHeader, CardBlock, Button, CardTitle, CardText } from 'reactstrap';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} id="inputs" type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderSubProducts = ({ fields, meta: { touched, error, submitFailed } }) => (
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
                {fields.map((variants, index) => (
                    <div>
                        <Card block>
                            <li key={index}>
                                <h4>Variante #{index + 1}</h4>
                                <Field name={`${variants}.size`} type="text" component={Size} label="Tamaño"/>
                                <Button type="button" onClick={() => fields.remove(index)}>Eliminar</Button>
                            </li>
                        </Card>
                    </div>
                ))}
            </Card>
        </div>
    </ul>
);

const NewProductForm = props => {
  const { handleSubmit, actionSubmit, pristine, reset, submitting } = props;
  return (
    <div>
        <form onSubmit={ handleSubmit(actionSubmit) }>
            <div style={{ float: 'left'}}>
                <Field name="name" type="text" component={ renderField } label="Nombre del producto"/>
                <Field name="code" type="number" component={renderField} label="Código del producto"/>
                <Field name="price" type="number" component={renderField} label="Precio del producto"/>
                <label>Descripción</label><br/>
                <Field name="description" type="text" component="textarea" placeholder="Descripción"/>
                <Field name="tags" component={ Tags } type="text" placeholder="Tags"/>
                <label>Variantes</label>
                <Field name="variantsSelect" type="input" component={Variants} />
            </div>
                <div style={{ float: 'left'}}>
                    <FieldArray name="variants" component={renderSubProducts} />
                </div>
            <div style={{float:'left'}}>
                <Button type="submit" disabled={submitting}>Guardar</Button>
                <Button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
            </div>
        </form>
    </div>
  );
};

class Tags extends Component{
    constructor(props) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {
            displayName: 'Tags',
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
          placeholder="Tags"
          value={multi ? multiValue : value}
        />

        <div >{this.props.hint}</div>
      </div>
    );
  }
}

class Variants extends  Component{
  constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {
            displayName: 'Size',
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
    return (
      <div >
        <h3 >{this.props.label}</h3>
        <Select.Creatable
          multi={multi}
          options={options}
          onChange={this.handleOnChange}
          value={multi ? multiValue : value}
          placeholder="Variantes"
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

