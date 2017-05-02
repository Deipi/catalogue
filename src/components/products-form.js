import React, { Component } from 'react';
import { Field, FieldArray, reduxForm, change } from 'redux-form/immutable'
import validate from './validate';
import {Size, Color, TagsSelect, VariansSelect} from './select-catalogues'

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
  render() {
    const { onChangeActionArray, variants, fields, meta: { touched, error, submitFailed } }=this.props;
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
                                    variants ? variants.map(obj => {let Objeto = obj.label.toUpperCase();

                                      if(Objeto==='TAMAÑO'){
                                        return(
                                          <div>
                                            <Field
                                              name={ `size[${ index }]` }
                                              type="text"
                                              component={ Size }
                                              label={ Objeto }
                                              onChangeAction={ onChangeActionArray }
                                              options={
                                                [
                                                  { value: 'C', label: 'Chico' },
                                                  { value: 'M', label: 'Mediano' },
                                                  { value: 'G', label: 'Grande' }
                                                ]
                                              }
                                              index={ index }
                                            />
                                          </div>
                                        );
                                      }else if(Objeto==='COLOR'){
                                        return(
                                          <div>
                                            <Field
                                              name={ `color[${ index }]` }
                                              type="text"
                                              component={ Size }
                                              label={ Objeto }
                                              onChangeAction={ onChangeActionArray }
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
                                            />
                                          </div>
                                        );
                                      }else{
                                        return(
                                          <div>
                                            <Field name={ Objeto + index } type="text" component={ renderField } label={Objeto}/>
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
        this.onChangeActionVariants = this.onChangeActionVariants.bind(this);
        this.onChangeActionArray = this.onChangeActionArray.bind(this);
    }
    onChangeActionVariants(value, inputName){
        const { dispatch, variantsArray } = this.props;
        dispatch(change('fieldArrays', inputName, value, true));
    }
    onChangeActionArray(value, inputName, index){
        const { dispatch, variantsArray } = this.props;

        dispatch(change('fieldArrays', inputName, value, true));

        const obj = { [inputName]: value.label };
        variantsArray[`variant[${ index + 1 }]`] = Object.assign({}, variantsArray[`variant[${ index + 1 }]`], obj)
        dispatch(change('fieldArrays', 'variantsArray', variantsArray, true))
    }
    render(){
        const { handleSubmit, actionSubmit, pristine, reset, submitting, variants } = this.props;
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
                          name="price"
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
                        <FieldArray
                          name="variants"
                          component={renderSubProducts}
                          variants={ variants }
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

