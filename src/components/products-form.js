import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form/immutable'
import validate from './validate'
import 'bootstrap/dist/css/bootstrap.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';



const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);


const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>Agregar Variante</button>
      {(touched || submitFailed) && error && <span>{error}</span>}
    </li>
    {fields.map((member, index) => (
      <li key={index}>
        <button
          type="button"          
          onClick={() => fields.remove(index)}        > Eliminar</button>
        <h4>Variante #{index + 1}</h4>
        <Field
          name={`${member}.size`}
          type="text"
          component={size}
          label="Tamaño"
        />

        <Field
          name={`${member}.color`}
          type="text"
          component={color}
          label="Color"
        />
       
      </li>
    ))}
  </ul>
);

const FieldArraysForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        type="text"
        component={renderField}
        label="Nombre del producto"
      />
      <Field
        name="code"
        type="text"
        component={renderField}
        label="Código del producto"
      />
      <Field
        name="description"
        type="text"
        component="textarea"
        placeholder="Descripción"
      />
      <Field name="tags" component={ Tags } type="text" placeholder="Tags"/>
      <FieldArray name="members" component={renderMembers} />
      <div>
        <button type="submit" disabled={submitting}>Guardar</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};



var Tags = React.createClass({
  displayName: 'Tags',
  propTypes: {
    hint: React.PropTypes.string,
    label: React.PropTypes.string
  },
  getInitialState () {
    return {
      multi: true,
      multiValue: [],
      options: [
        { value: 'R', label: 'Ropa' },
        { value: 'E', label: 'Electronica' },
        { value: 'Z', label: 'Zapatos' }
      ],
      value: undefined
    };
  },
  handleOnChange (value) {
    const { multi } = this.state;
    if (multi) {
      this.setState({ multiValue: value });
    } else {
      this.setState({ value });
    }
  },
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
        />
        <div >{this.props.hint}</div>
        
      </div>
    );
  }
});

var size = React.createClass({
  displayName: 'size',
  propTypes: {
    hint: React.PropTypes.string,
    label: React.PropTypes.string
  },
  getInitialState () {
    return {
      multi: false,
      multiValue: [],
      options: [
        { value: 'C', label: 'Chico' },
        { value: 'M', label: 'Mediano' },
        { value: 'G', label: 'Grande' }
      ],
      value: undefined
    };
  },
  handleOnChange (value) {
    const { multi } = this.state;
    if (multi) {
      this.setState({ multiValue: value });
    } else {
      this.setState({ value });
    }
  },
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
        />
        <div >{this.props.hint}</div>
        
      </div>
    );
  }
});

var color = React.createClass({
  displayName: 'color',
  propTypes: {
    hint: React.PropTypes.string,
    label: React.PropTypes.string
  },
  getInitialState () {
    return {
      multi: false,
      multiValue: [],
      options: [
        { value: 'V', label: 'Verde' },
        { value: 'A', label: 'Azul' },
        { value: 'N', label: 'Negro' },
        { value: 'G', label: 'Gris' },
        { value: 'B', label: 'Blanco' },
        { value: 'R', label: 'Rojo' }
      ],
      value: undefined
    };
  },
  handleOnChange (value) {
    const { multi } = this.state;
    if (multi) {
      this.setState({ multiValue: value });
    } else {
      this.setState({ value });
    }
  },
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
        />
        <div >{this.props.hint}</div>
        
      </div>
    );
  }
});



export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  validate,
})(FieldArraysForm);

