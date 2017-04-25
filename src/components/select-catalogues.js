import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { change } from 'redux-form/immutable'

class VariansSelectComponent extends Component{
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.validateNewOption = this.validateNewOption.bind(this);
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

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(change('fieldArrays', 'ProductVariants', this.state.multiValue, true))
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
          isValidNewOption={ this.validateNewOption }
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

////////////////////////////////////////////////////////////////////

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
    const { multi, multiValue, options, value } = this.state;
    return (
      <div >
        <h3 >{this.props.label}</h3>
        <Select.Creatable
          multi={multi}
          options={options}
          onChange={this.handleOnChange}
          isValidNewOption={ this.validateNewOption }
          value={multi ? multiValue : value}
          placeholder="Tags"
        />
        <div >{this.props.hint}</div>
      </div>
    );
  }
}

export class Size extends Component{
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

        {this.props.label}
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

export class Color extends Component{
    constructor(props) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {
            displayName: 'Color',
            multi: false,
            multiValue: [],
            options: [
                { value: 'V', label: 'Verde' },
                { value: 'A', label: 'Azul' },
                { value: 'R', label: 'Rojo' },
                { value: 'M', label: 'Morado' },
                { value: 'B', label: 'Blanco' }
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
        {this.props.label}
        <Select.Creatable
          multi={multi}
          options={options}
          onChange={this.handleOnChange}
          placeholder="Color"
          value={multi ? multiValue : value}
        />
        <div >{this.props.hint}</div>
      </div>
    );
  }
}