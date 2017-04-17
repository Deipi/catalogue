import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import Select from 'react-select';

const SimpleForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <div>
          <Field name="name" component="input" type="text" placeholder="Nombre"/>
        </div>
      </div>
      <div>
        <label>Código</label>
        <div>
          <Field name="code" component="input" type="text" placeholder="Código"/>
        </div>
      </div>
      <div>
        <label>Descripción</label>
        <div>
          <Field name="description" component="textarea" type="text" placeholder="Descripción"/>
        </div>
      </div>

      <div>
        <label>Tags</label>
        <div>
          <Field name="tags" component="input" type="text" placeholder="Tags"/>
        </div>
      </div>
      
      <div>
        <label>Precio</label>
        <div>
          <Field name="price" component="input" type="text" placeholder="Precio"/>
        </div>
      </div>
     
      
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'simple'  // a unique identifier for this form
})(SimpleForm)