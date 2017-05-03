import React, { Component } from 'react';
import { Field, FieldArray, reduxForm, change } from 'redux-form/immutable'
import validate from './validate';
import {VariantsDictionary, TagsSelect, VariansSelect} from './select-catalogues'

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

class renderSubProducts extends React.Component{
  constructor(props){
    super(props);
  }
  render() {const { onChangeActionArray, variantsArray, fields, meta: { touched, error, submitFailed } }=this.props;
    return (
      <ul>
          <div style={{ float: 'left'}}>
              <li>
                  <Button type="button" onClick={(() => fields.push({}))}>Crear</Button>
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
                                    variantsArray ? variantsArray.map(obj => {let Objeto = obj.label.toUpperCase();

                                      if(Objeto==='TAMAÑO'){
                                        return(
                                          <div>
                                            <Field
                                              name={ `size[${ index }]` }
                                              type="text"
                                              component={ VariantsDictionary }
                                              label={ Objeto }
                                              onChangeAction={ onChangeActionArray }
                                              placeholder="Tamaño"
                                              options={
                                                [
                                                  { value: 'C', label: 'Chico' },
                                                  { value: 'M', label: 'Mediano' },
                                                  { value: 'G', label: 'Grande' }
                                                ]
                                              }
                                              index={ index }
                                              variantsArray={this.variantsArray}
                                            />
                                          </div>
                                        );
                                      }else if(Objeto==='COLOR'){
                                        return(
                                          <div>
                                            <Field
                                              name={ `color[${ index }]` }
                                              type="text"
                                              component={ VariantsDictionary }
                                              label={ Objeto }
                                              onChangeAction={ onChangeActionArray }
                                              placeholder="Color"
                                              options={
                                                [
                                                  { value: 'V', label: 'Verde' },
                                                  { value: 'A', label: 'Azul' },
                                                  { value: 'R', label: 'Rojo' },
                                                  { value: 'M', label: 'Morado' },
                                                  { value: 'B', label: 'Blanco' }
                                                ]
                                              }
                                              index={ index }
                                              variantsArray={this.variantsArray}
                                            />
                                          </div>
                                        );
                                      }else{
                                        return(
                                          <div>
                                            <Field
                                                name={ `${Objeto}[${ index }]` }
                                                type="text"
                                                component={ renderField }
                                                onChangeAction={ onChangeActionArray }
                                                label={Objeto}
                                                index={ index }
                                            />
                                          </div>
                                        );
                                      }
                                    }) : null
                                  }
                                  <Button type="button" onClick={() => fields.remove(index)}>Eliminar</Button>
                              </li>
                          </Card>
                      </div>
                  ))}
              </Card><br/>
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
        dispatch(change('fieldArrays', inputName, value, true));
        const obj = { [inputName]: value.label };
        variants[`variant[${ index }]`] = Object.assign({}, variants[`variant[${ index }]`], obj)
        dispatch(change('fieldArrays', 'variants', variants, true))
    }
    render(){
        const { handleSubmit, actionSubmit, pristine, reset, submitting, variantsArray } = this.props;
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
                          component={renderSubProducts}
                          variantsArray={ variantsArray }
                          onChangeActionArray={ this.onChangeActionArray }
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

