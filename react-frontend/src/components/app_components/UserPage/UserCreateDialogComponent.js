import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { InputNumber } from "primereact/inputnumber";

const getSchemaValidationErrorsStrings = (errorObj) => {
  let errMsg = {};
  for (const key in errorObj.errors) {
    if (Object.hasOwnProperty.call(errorObj.errors, key)) {
      const element = errorObj.errors[key];
      if (element?.message) {
        errMsg[key] = element.message;
      }
    }
  }
  return errMsg.length
    ? errMsg
    : errorObj.message
      ? { error: errorObj.message }
      : {};
};

const UserCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();

  useEffect(() => {
    let init = { isActive: false };
    if (!_.isEmpty(props?.entity)) {
      init = initilization({ ...props?.entity, ...init }, [], setError);
    }
    set_entity({ ...init });
    setError({});
  }, [props.show]);

  const validate = () => {
    let ret = true;
    const error = {};

    if (!ret) setError(error);
    return ret;
  };

  const onSave = async () => {
    if (!validate()) return;
    let _data = {
      email: _entity?.email,
      username: _entity?.username,
      password: _entity?.password,
      isActive: _entity?.isActive || false,
      points: _entity?.points,
      createdBy: props.user._id,
      updatedBy: props.user._id,
    };

    setLoading(true);

    try {
      const result = await client.service("user").create(_data);
      props.onHide();
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info User created successfully",
      });
      props.onCreateResult(result);
    } catch (error) {
      console.debug("error", error);
      setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
      props.alert({
        type: "error",
        title: "Create",
        message: "Failed to create in User",
      });
    }
    setLoading(false);
  };

  const renderFooter = () => (
    <div className="flex justify-content-end">
      <Button
        label="save"
        className="p-button-text no-focus-effect"
        onClick={onSave}
        loading={loading}
      />
      <Button
        label="close"
        className="p-button-text no-focus-effect p-button-secondary"
        onClick={props.onHide}
      />
    </div>
  );

  const setValByKey = (key, val) => {
    let new_entity = { ..._entity, [key]: val };
    set_entity(new_entity);
    setError({});
  };

  return (
    <Dialog
      header="Create User"
      visible={props.show}
      closable={false}
      onHide={props.onHide}
      modal
      style={{ width: "40vw" }}
      className="min-w-max scalein animation-ease-in-out animation-duration-1000"
      footer={renderFooter()}
      resizable={false}
    >
      <div
        className="grid p-fluid overflow-y-auto"
        style={{ maxWidth: "55vw" }}
        role="user-create-dialog-component"
      >
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="email">Email:</label>
            <InputText
              id="email"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.email}
              onChange={(e) => setValByKey("email", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["email"]) ? (
              <p className="m-0" key="error-email">
                {error["email"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="username">Username:</label>
            <InputText
              id="username"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.username}
              onChange={(e) => setValByKey("username", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["username"]) ? (
              <p className="m-0" key="error-username">
                {error["username"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="password">Password:</label>
            <InputText
              id="password"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.password}
              onChange={(e) => setValByKey("password", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["password"]) ? (
              <p className="m-0" key="error-password">
                {error["password"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field flex">
          <span className="align-items-center">
            <label htmlFor="isActive">Is Active:</label>
            <InputSwitch
              id="isActive"
              className="ml-3"
              checked={_entity?.isActive}
              onChange={(e) => setValByKey("isActive", e.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["isActive"]) ? (
              <p className="m-0" key="error-isActive">
                {error["isActive"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="points">Points:</label>
            <InputNumber
              id="points"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.points}
              onChange={(e) => setValByKey("points", e.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["points"]) ? (
              <p className="m-0" key="error-points">
                {error["points"]}
              </p>
            ) : null}
          </small>
        </div>
        <small className="p-error">
          {Array.isArray(Object.keys(error))
            ? Object.keys(error).map((e, i) => (
                <p className="m-0" key={i}>
                  {e}: {error[e]}
                </p>
              ))
            : error}
        </small>
      </div>
    </Dialog>
  );
};

const mapState = (state) => {
  const { user } = state.auth;
  return { user };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(UserCreateDialogComponent);
