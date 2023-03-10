import Head from 'next/head'
import Layout_login from '../../layout_login/layout_login'
import Link from 'next/link'
import styles from '../../styles/Form.module.css';
import Image from 'next/image'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useId, useState } from 'react';
import { useFormik, Form, Field, FieldArray, Formik, getIn, ErrorMessage } from 'formik';
import login_validate from '../../lib/validate';
import { useRouter } from 'next/router';
import Layout from "../../components/layout"
import * as yup from 'yup';
import Select from 'react-select';
import { string } from 'yup/lib/locale';
import { Input } from 'postcss';


export default function Login(){
  const instanceId = useId();

  const mealOptions = [
    { value: "breakfast", label: "breakfast" },
    { value: "brunch", label: "brunch" },
    { value: "snack", label: "snack" },
    { value: "lunch", label: "lunch" },
    { value: "dinner", label: "dinner" }
  ];

    interface Inames {
      qty: number, name: string
    }

    interface FormValues {
      names: Inames[];
      meal: string
    }

    const initialMealOptions = ["recipy1", "recipy2", "recipy3"]

    const initialValues: FormValues = {
      names: [{name: 'breakfast', qty: 1}, {name: 'breakfast', qty: 2}, {name: 'breakfast', qty: 3}],
      meal: 'snack'
    }

    const validationSchema = yup.object().shape({
      names: yup.array().of(
        yup.object().shape({
          name: yup.string().max(10).required(),
          qty: yup.number().required()
        })
      ).required(),
      meal: yup.string().max(10).required()
    });

    const [show, setShow] = useState(false)
    const router = useRouter()
    // formik hook
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit
    })

    async function onSubmit(values: FormValues){
      setTimeout(() => {
        //alert(JSON.stringify(values, null, 2));
        console.log(values)
      }, 500)
    }

    // const FieldComponent = ({ field, form: { touched, errors } }) => {
    //   const error = getIn(errors, field.name);
    //   const touch = getIn(touched, field.name);
    //   return (
    //     <div>
    //       <input type="text" name={field.name} onChange={field.onChange} className={styles.input_group}/>
    //       {touch && error ? <p>{error}</p> : null}
    //     </div>
    //   )
    // }
    //console.log(initialValues)

    return (
      <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      >
      {({ values, handleSubmit, handleChange, errors }) => (
        <Layout>

          <Head>
              <title>DynamicInput</title>
          </Head>

          <section className='w-3/4 mx-auto flex flex-col gap-3'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Explore</h1>
                <p className='w-3/4 mx-auto text-gray-400'>Description text goes here.</p>
            </div>

            <Form className='flex gap-5' onSubmit={handleSubmit}>
              <FieldArray
              name="names"
              render={arrayHelpers => (
                <div>
                  {values.names.map((name, index) => (
                      <div key={index} className={`${styles.input_group} flex column justify-evenly color to-blue-200 `}>
                        {/*<Field name={`names.${index}`} className={styles.input_group}/>*/}
                        <Field name={`names[${index}].name`}>
                        {({ field, form }) => (
                          <Select
                            className="select-wrap"
                            classNamePrefix="select-box"
                            instanceId={instanceId}
                            defaultValue={{ value: values.names[index].name, label: values.names[index].name }}
                            options={mealOptions}
                            onChange={(selectedOption) =>
                                form.setFieldValue(
                                  `names.${index}.name`,
                                  selectedOption.value,
                                  )}
                          />)}
                        </Field>
                        <Field  name={`names.${index}.qty`} className={styles.input_group}/>
                        <ErrorMessage name={`names.${index}.name`} />
                        <ErrorMessage name={`names.${index}.qty`} />
                        <div className="input-button m-2">
                          <button
                            type="button"
                            className={styles.button}
                            onClick={() => arrayHelpers.remove(index)} // remove a name from the list
                          >
                            Remove input
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                    type="button"
                    onClick={() => arrayHelpers.push({name: 'recipy1', qty: 1})} // insert an empty string at a position
                  >
                    Add input
                  </button>
                  {/* login buttons */}
                  <div className="input-button">
                          <button type='submit' className={styles.button}>
                            Submit
                          </button>
                      </div>
                </div>
              )}
              />
            {/*<Field name="meal">
            {({ field, form }) => (
              <Select
                className="select-wrap"
                classNamePrefix="select-box"
                instanceId={useId()}
                defaultValue={{ value: initialValues.meal, label: initialValues.meal }}
                options={mealOptions}
                onChange={(selectedOption) =>
                    form.setFieldValue(
                      'meal',
                      selectedOption.value,
                      )}
              />)}
            </Field>
              {errors.meal && (
                <span className="error">{errors.meal}</span>
              )}*/}
            </Form>
          </section>

        </Layout>
      )}
      </Formik>
    )
}