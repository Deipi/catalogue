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
        <h3 >{this.props.label}</h3>
        <Select.Creatable
          noResultsText=""
          required
          style={ styleError }
          name={ this.props.input.name }
          value={ this.props.input.value }
          multi={multi}
          options={options}
          onChange={ (value, algo) => { this.handleOnChange(value); onChangeAction(value, name); } }
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

const ERROR_STYLE = {
    position: 'absolute',
    zIndex: '3',
    right: '11px',
    top: '-9px',
};


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
                onChange={ option => props.onChangeAction(option, props.input.name, props.index) }
                options={ props.options }
                className={ props.className }
                { ...props }
            />
        </div>
    );
};
