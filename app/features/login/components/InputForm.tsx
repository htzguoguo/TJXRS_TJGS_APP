import { Button, Icon, Input, Item, Spinner, Text, View } from "native-base";
import React from "react";
import { Field, Form } from "react-final-form";
import createDecorator from 'final-form-focus'
import { composeValidators, isAlphaNumeric, isMaxLength15, isMinLength6, isMinLength8, isRequired } from '../../../components/validateRules';
import { IFormValues } from "../containers";
import { StyleSheet } from "react-native";
interface IProps {
  onLogin: (values: IFormValues,) => void,
  isLoginLoading: boolean
}
let focusOnError = createDecorator()
export const InputForm = (props: IProps) => (
  <Form
    initialValues={{ name: 'admin123', password: '123456' }}
    onSubmit={props.onLogin}
    decorators={[focusOnError]}
  >
    {({ handleSubmit, pristine, submitting }) => (
      <View padder>
        <Field
          name="name"
          validate={isRequired}
          warn={isRequired}
        >
          {
            field => (
              <Item error={field.meta.error && field.meta.touched}>
                <Icon
                  active
                  name="person-outline"
                />
                <Input
                  placeholder="用户名"
                  secureTextEntry={false}
                  {...field.input}
                />
                {field.meta.touched && field.meta.error && (
                  <Text>{field.meta.error}</Text>
                )}
              </Item>
            )
          }
        </Field>
        <Field
          name="password"
          validate={composeValidators(isRequired, isAlphaNumeric, isMinLength6, isMaxLength15)}
          warn={composeValidators(isAlphaNumeric, isMinLength6, isMaxLength15)}
        >
          {
            field => (
              <Item error={field.meta.error && field.meta.touched}>
                <Icon
                  active
                  name="lock-closed-outline"
                />
                <Input
                  placeholder="密码"
                  secureTextEntry={true}
                  {...field.input}
                />
                {field.meta.touched && field.meta.error && (
                  <Text>{field.meta.error}</Text>
                )}
              </Item>
            )
          }
        </Field>
        <View padder>
          {
            props.isLoginLoading ? <Spinner /> :
              <Button block onPress={handleSubmit}>
                <Text>登录</Text>
              </Button>
          }

        </View>
        <View style={styles.forgotPasswordContainer}>

          <Button
            style={styles.forgotPasswordButton}
            transparent
          >
            <Text>忘记密码?</Text>
          </Button>
          <Button
            style={styles.forgotPasswordButton}
            transparent
          >
            <Text>注册</Text>
          </Button>
        </View>

      </View>
    )}
  </Form>
)

const styles = StyleSheet.create({
  
  forgotPasswordContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  }, 
});