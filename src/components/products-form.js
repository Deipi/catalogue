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
    const {variants, fields, meta: { touched, error, submitFailed } }=this.props;
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
                                    variants ? variants.map(obj => {
                                      let Objeto = obj.label.toUpperCase();

                                      if(Objeto==='TAMAÑO'){
                                        return(
                                          <div>
                                            <Field name={Objeto} type="text" component={ Size } label={Objeto}/>
                                          </div>
                                        );
                                      }else if(Objeto==='COLOR'){
                                        return(
                                          <div>
                                            <Field name={Objeto} type="text" component={ Color } label={Objeto}/>
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

