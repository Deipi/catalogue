import React, { Component } from 'react';
import Immutable from 'immutable';
import { Field, FieldArray, reduxForm, change, arrayRemove } from 'redux-form/immutable'
import validate from './validate';
import { VariantsDictionary, TagsSelect, VariansSelect } from './select-catalogues'

import 'react-select/dist/react-select.css';
import { Card, CardBlock, CardHeader, Button, InputGroupAddon, InputGroup, Input} from 'reactstrap';

const renderField = ({ input, label, placeholder, type, meta: { touched, error } }) => (
  <InputGroup>
    <InputGroupAddon> {label}</InputGroupAddon>
      <Input {...input} id="inputs" type={type} placeholder={placeholder} />
      {touched && error && <span>{error}</span>}
  </InputGroup>
);

class renderSubProducts extends React.Component{
    constructor(props){
        super(props);

        this.validateVariant = this.validateVariant.bind(this);

        this.state = {
            validationError: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.meta.error && !this.state.validationError) {
            this.setState({ validationError: true });
            const { dispatch } = this.props;
            const index = parseInt(nextProps.meta.error);

            // Remove child if is repeated in the list
            this.props.variantsArray.map(obj => {
                dispatch(change('fieldArrays', `variantsArray[${ index }].${ obj.name ? obj.name : obj.label }`, {}));
            });
        } else {
            this.setState({ validationError: false });
        }
    }

    validateVariant(value) {
        //aqui se retorna un error al component=VariantsDictionary
        return value && value.label ? undefined : "Please don't repeat variants";
    }

    render() {
        const { onChangeActionArray, variantsArray, fields, meta: { touched, error, submitFailed } } = this.props;
        return (
            <ul>
                <div style={{ float: 'left'}}>
                    <li>
                        <Button type="button" onClick={(() => fields.push(Immutable.Map()))}>Crear</Button>
                        {(touched || submitFailed) && error && <span>{error}</span>}
                    </li>
                </div>
                <div style={{ float: 'right'}}>
                    <Card>
                        <CardHeader>Subproductos</CardHeader>
                        {fields.map((field, index) => (
                            <Card block>
                                <li key={index}>
                                    <h4>Variante #{index + 1} </h4>
                                        {
                                            variantsArray ?
                                            variantsArray.map(obj =>
                                                { // Recibir el nombre
                                                    if (obj.name) {
                                                        return (
                                                            <Field
                                                                name={ `${ field }.${ obj.name }` }
                                                                type="text"
                                                                component={ VariantsDictionary }
                                                                label={ obj.label }
                                                                onChangeAction={ onChangeActionArray }
                                                                //placeholder: Obtener el label / crear un placeholder en multiValue
                                                                placeholder={ obj.placeholder }
                                                                // options: Obtener las opciones del catálogo (select-catalogues)
                                                                options={ obj.options }
                                                                index={ index }
                                                                variantsArray={ this.variantsArray }
                                                                // condicional para validar el select: llama la funcion validateVariant
                                                                validate={ [ this.validateVariant ] }
                                                            />
                                                        );
                                                    } else {
                                                        return (
                                                            <Field
                                                                name={ `${ field }.${ obj.label }` }
                                                                type="text"
                                                                component={ renderField }
                                                                onChangeAction={ onChangeActionArray }
                                                                label={ obj.label }
                                                                index={ index }
                                                            />
                                                        );
                                                    }
                                            }) : null
                                        }
                                    <Button type="button" onClick={() => fields.remove(index)}>Eliminar</Button>
                                </li>
                            </Card>
                        ))}
                    </Card>
                    <br/>
                </div>
            </ul>
        );
    }
}

class NewProductForm extends React.Component{
    constructor(props){
        super(props);
        this.onChangeActionTags = this.onChangeActionTags.bind(this);
        this.onChangeActionVariants = this.onChangeActionVariants.bind(this);
        this.onChangeActionArray = this.onChangeActionArray.bind(this);
    }

    onChangeActionVariants(value, inputName){
        const { dispatch } = this.props;
        dispatch(change('fieldArrays', inputName, value, true));
    }

    onChangeActionTags(value, inputName){
        const { dispatch } = this.props;
        const w=value.map(obj=>obj.label)
        dispatch(change('fieldArrays', inputName, w, true));
    }

    onChangeActionArray(value, inputName, index){
        const { dispatch, variants } = this.props;
        dispatch(change('fieldArrays', inputName, Object.assign({}, value, { name: inputName }), true));
        const obj = { [inputName]: value ? value.label : "" };
        variants[index] = Object.assign({}, variants[index], obj)
        dispatch(change('fieldArrays', 'variants', variants, true))
    }

    render(){
        const { handleSubmit, actionSubmit, pristine, reset, submitting, variantsArray, dispatch } = this.props;
        return (
            <div>
                <form onSubmit={ handleSubmit(actionSubmit) }>
                    <div style={{ float: 'left'}}>
                        <Field
                          name="name"
                          type="text"
                          component={ renderField }
                          label="Nombre del producto"
                        />
                        <Field
                          name="code"
                          type="number"
                          component={renderField}
                          label="Código del producto"
                        />
                        <Field
                          name="amount"
                          type="number"
                          component={renderField}
                          label="Precio del producto"
                        />
                        <label>Descripción</label><br/>
                        <Field
                          name="description"
                          type="text"
                          component="textarea"
                          placeholder="Descripción"
                        />
                        <Field
                            name="tags"
                            component={ TagsSelect }
                            type="text"
                            placeholder="Tags"
                            onChangeAction={ this.onChangeActionTags }
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
                        <FieldArray
                          name="variantsArray"
                          component={ renderSubProducts }
                          variantsArray={ variantsArray }
                          onChangeActionArray={ this.onChangeActionArray }
                          dispatch={ dispatch }
                        />
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

export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
   validate
})(NewProductForm);

