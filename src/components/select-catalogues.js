//esto es el select

import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { change } from 'redux-form/immutable'

const ERROR_STYLE = {
    position: 'absolute',
    zIndex: '3',
    right: '-13px',
    top: '-10px',
    width: '20em'
};

const optionsSize = [
    { value: 'C', label: 'Chico' },
    { value: 'M', label: 'Mediano' },
    { value: 'G', label: 'Grande' }
];

const optionsColor = [
    { value: 'V', label: 'Verde' },
    { value: 'N', label: 'Negro' },
    { value: 'A', label: 'Azul' },
    { value: 'R', label: 'Rojo' },
    { value: 'M', label: 'Morado' },
    { value: 'B', label: 'Blanco' },
    { value: 'G', label: 'Gris' }
];
const optionsFlavor = [
    { value: 'L', label: 'Limon' },
    { value: 'N', label: 'Naranja' },
    { value: 'F', label: 'Fresa' },
    { value: 'M', label: 'Mora' },
    { value: 'Nat', label: 'Natural'},
    { value: 'V', label: 'Vainilla'}
];

const optionsStyle = [
    { value: 'V', label: 'Vaquero' },
    { value: 'E', label: 'Europeo' },
    { value: 'C', label: 'Casual' },
    { value: 'P', label: 'Playa' },
    { value: 'N', label: 'Noche'},
    { value: 'Ver', label: 'Verano'}
];

const optionsMaterial = [
    { value: 'M', label: 'Madera' },
    { value: 'V', label: 'Vidrio' },
    { value: 'Pla', label: 'Plastico' },
    { value: 'P', label: 'Piel' },
    { value: 'T', label: 'Tela'},
    { value: 'Carton', label: 'Carton'}
];

export const options = [
    { value: 'S', label: 'Sabor', name: 'taste', options: optionsFlavor , placeholder:'Flavor'},
    { value: 'E', label: 'Estilo', name: 'style', options: optionsStyle, placeholder:'Style' },
    { value: 'M', label: 'Material', name: 'material', options: optionsMaterial, placeholder:'Material'},
    { value: 'T', label: 'Tamaño', name: 'size', options: optionsSize, placeholder:'Size' },
    { value: 'C', label: 'Color', name: 'color', options: optionsColor, placeholder: 'Color' }
];

const multiValue = [
  { value: 'T', label: 'Tamaño', name: 'size', options: optionsSize, placeholder:'Size'},
  { value: 'C', label: 'Color', name: 'color', options: optionsColor, placeholder:'Color'}
];

class VariansSelectComponent extends Component{
  constructor(props) {
      super(props);
      this.validateNewOption = this.validateNewOption.bind(this);
      this.state = {
          displayName: 'VariansSelect',
          multi: true,
          options,
          value: undefined
      };
  }

  propTypes: {
  hint: React.PropTypes.string,
  label: React.PropTypes.string
  }

  validateNewOption(value) {
    const { options, multiValue } = this.state;

    if (value.label) {
      if (options.filter(element => element.label.toUpperCase() === value.label.toUpperCase()).length) {
        return false;
      }else{
        return true;
      }
    }
  }

  render () {
    const { multi, multiValue, options, value } = this.state;
    const{ onChangeAction } = this.props;
    const { name } = this.props.input;
    return (
      <div >
        <br/>
        <Select.Creatable
          multi={multi}
          options={options}
          onChange={(value, algo) => { onChangeAction(value, name); } }
          isValidNewOption={ this.validateNewOption }
          placeholder="VariansSelect"
          value={this.props.input.value}
          name={this.props.input.name}
          { ...this.props}
        />

        <div >{this.props.hint}</div>
      </div>
    );
  }
}


export const VariansSelect = connect()(VariansSelectComponent);

export class TagsSelect extends  Component{

  constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.validateNewOption = this.validateNewOption.bind(this);
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

  validateNewOption(value) {
    const { options, multiValue } = this.state;

    if (value.label) {
      if (options.filter(element => element.label.toUpperCase() === value.label.toUpperCase()).length || multiValue.filter(element => element.label.toUpperCase() === value.label.toUpperCase()).length) {
        return false;
      }else{
        return true;
      }
    }
  }

  render () {

    const { multi, multiValue, options } = this.state;
    const{ onChangeAction} = this.props;
    const { name } = this.props.input;

    const styleError = {};
    let errorSpan = null;

    if (this.props.meta.touched && this.props.meta.error) {
        errorSpan = <span className="badge badge-danger" style={ ERROR_STYLE }>{ this.props.meta.error }</span>;
        styleError.borderColor = 'darkred';
    }

    return (
      <div >
        <br/>
        <Select.Creatable
          noResultsText=""
          required
          style={ styleError }
          name={ this.props.input.name }
          multi={multi}
          options={options}
          onChange={ (value, algo) => { this.handleOnChange(value); onChangeAction(value, name); } }
          isValidNewOption={ this.validateNewOption }
          placeholder="VariansSelect"
          value={this.props.input.value}
          { ...this.props}
        />

        <div >{this.props.hint}</div>
      </div>
    );
  }
}

export const VariantsDictionary = (props) => {
    const styleError = {};
    let errorSpan = null;

    if (props.meta.touched && props.meta.error) {
        errorSpan = <span className="badge badge-danger" style={ ERROR_STYLE }>{ props.meta.error }</span>;
        styleError.borderColor = 'darkred';
    }

    return (
        <div style={ { position: 'relative' } }>
          { errorSpan }
            <Select
                noResultsText=""
                required
                autosize={ false }
                style={ styleError }
                name={ props.input.name }
                value={ props.input.value }
                onChange={ option => props.onChangeAction(option, props.input.name, props.index, true) }
                options={ props.options }
                className={ props.className }
                { ...props }
            />
        </div>
    );
};
