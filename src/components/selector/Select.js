import React from "react";
import "../../assets/style/Select.css";
import { Grid } from "@material-ui/core";

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      focusedValue: -1,
      isFocused: false,
      isOpen: false,
      typed: ""
    };

    /*  this.onFocus = this.onFocus.bind(this); */
    this.onBlur = this.onBlur.bind(this);
   /*  this.onKeyDown = this.onKeyDown.bind(this); */

    this.onClick = this.onClick.bind(this);
    this.onDeleteOption = this.onDeleteOption.bind(this);
    /* this.onHoverOption = this.onHoverOption.bind(this); */
    this.onClickOption = this.onClickOption.bind(this);
    this.onUpdateOption = this.onUpdateOption.bind(this);

    this.renderOption = this.renderOption.bind(this);
  }

  onFocus() {
    this.setState({
      isFocused: true
    });
  }

  onBlur() {
    const { options, multiple } = this.props;

    this.setState(prevState => {
      const { values } = prevState;

      if (multiple) {
        return {
          focusedValue: -1,
          isFocused: false,
          isOpen: false
        };
      } else {
        const value = values[0];

        let focusedValue = -1;

        if (value) {
          focusedValue = options.findIndex(option => option.value === value);
        }

        return {
          focusedValue,
          isFocused: false,
          isOpen: false
        };
      }
    });
  }

 /*  onKeyDown(e) {
    const { options, multiple } = this.props;
    const { isOpen } = this.state;

    switch (e.key) {
      case " ":
        e.preventDefault();
        if (isOpen) {
          if (multiple) {
            this.setState(prevState => {
              const { focusedValue } = prevState;

              if (focusedValue !== -1) {
                const [...values] = prevState.values;
                const value = options[focusedValue].value;
                const index = values.indexOf(value);

                if (index === -1) {
                  values.push(value);
                } else {
                  values.splice(index, 1);
                }

                return { values };
              }
            });
          }
        } else {
          this.setState({
            isOpen: true
          });
        }
        break;
      case "Escape":
      case "Tab":
        if (isOpen) {
          e.preventDefault();
          this.setState({
            isOpen: false
          });
        }
        break;
      case "Enter":
        this.setState(prevState => ({
          isOpen: !prevState.isOpen
        }));
        break;
      case "ArrowDown":
        e.preventDefault();
        this.setState(prevState => {
          let { focusedValue } = prevState;

          if (focusedValue < options.length - 1) {
            focusedValue++;

            if (multiple) {
              return {
                focusedValue
              };
            } else {
              return {
                values: [options[focusedValue].value],
                focusedValue
              };
            }
          }
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        this.setState(prevState => {
          let { focusedValue } = prevState;

          if (focusedValue > 0) {
            focusedValue--;

            if (multiple) {
              return {
                focusedValue
              };
            } else {
              return {
                values: [options[focusedValue].value],
                focusedValue
              };
            }
          }
        });
        break;
      default:
        if (/^[a-z0-9]$/i.test(e.key)) {
          const char = e.key;

          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.setState({
              typed: ""
            });
          }, 1000);

          this.setState(prevState => {
            const typed = prevState.typed + char;
            const re = new RegExp(`^${typed}`, "i");
            const index = options.findIndex(option => re.test(option.value));

            if (index === -1) {
              return {
                typed
              };
            }

            if (multiple) {
              return {
                focusedValue: index,
                typed
              };
            } else {
              return {
                values: [options[index].value],
                focusedValue: index,
                typed
              };
            }
          });
        }
        break;
    }
  }
 */
  onClick() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  onDeleteOption(e) {
    const { value } = e.currentTarget.dataset;

    this.setState(
      prevState => {
        const [...values] = prevState.values;
        const index = values.indexOf(value);

        values.splice(index, 1);

        return { values };
      },
      () => this.props.deletOption(value)
    );
  }

  componentDidUpdate(prevProps) {
  
    if (prevProps.searchParams != this.props.searchParams) {
 
      this.onUpdateOption(this.props.searchParams);
    }  

    if (
      prevProps.resetSelector != this.props.resetSelector &&
      this.props.resetSelector == true
    ) {
      this.setState({ values: [] }, () => this.props.handleSelector());
    }
  }

 
  onUpdateOption(e) {
 
    const { multiple } = this.props;
    if (e.length == undefined) {
      return;
    } else if (e.length == 1 && e[0] != "") {
      const value = e[0];
      let str = `${value}`;
      const arr = str.split(",");
    
      //  const arr = e[0].split(',');
      this.setState({ isOpen: false });
      this.setState(
        prevState => {
          if (!multiple) {
            const [...values] = prevState.values;
            values.push(value);
            return {
              values
            };
          }
          const [...values] = prevState.values;
          const index = values.indexOf(value);

          if (index === -1) {
            for (var i = 0; i < arr.length; i++) {
              values.push(arr[i]);
            }
          } else {
            values.splice(index, 1);
          }
       
          return { values };
        },
        () => this.props.setSearchQuery(this.state.values)
      );
    }
  }
  onClickOption(e) {
    const { multiple } = this.props;
    const { value } = e.length > 0 ? e : e.currentTarget.dataset;
   
    const check = this.state.values.indexOf(value);
    if (check === -1) {
      this.setState({ isOpen: false });
      this.setState(
        prevState => {
          if (!multiple) {
            const [...values] = prevState.values;
            const index = values.indexOf(value);
            if (index === -1) {
              values.pop("Select Duration");
              values.push(value);
            } else {
              /*   values.pop(value);
              values.push("Select Duration"); */
            }
            return {
              values
            };
          }

          const [...values] = prevState.values;
          const index = values.indexOf(value);

          if (index === -1) {
            values.push(value);
          } /* else {
            values.splice(index, 1);
          } */

          return { values };
        },
        () => this.props.setSearchQuery(this.state.values)
      );
    }
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  renderValues() {
    const { placeholder, multiple } = this.props;
    const { values } = this.state;

    if (values.length === 0) {
      return <div className="placeholder">{placeholder}</div>;
    }
  

    if (multiple) {
      return values.map(value => {
        return (
          <span
            key={value}
            onClick={this.stopPropagation}
            style={{ backgroundColor: localStorage.getItem("clientcolor") }}
            className="multiple value"
          >
            {value}
            <span
              data-value={value}
              onClick={this.onDeleteOption}
              className="delete"
            >
              <img src={require("../../assets/images/clear-wexer.svg")} />
            </span>
          </span>
        );
      });
    }
    return (
      <span
        key={values[0]}
        onClick={this.stopPropagation}
        style={{ backgroundColor: localStorage.getItem("clientcolor") }}
        className="multiple-single value"
      >
        {values[0]}
        <span
          data-value={values[0]}
          onClick={this.onDeleteOption}
          className="delete"
        >
          <img
            className=".svg"
            src={require("../../assets/images/clear-wexer.svg")}
          />
        </span>
      </span>
    );
  }

  renderOptions() {
    const { options } = this.props;
    const { isOpen } = this.state;

    if (!isOpen) {
      return null;
    }

    return <div className="options">{options.map(this.renderOption)}</div>;
  }

  renderOption(option, index) {
    const { multiple } = this.props;
    const { values, focusedValue } = this.state;

    const { value } = option;
    const selected = values.includes(value);

    let className = "option";
    if (selected) className += " selected option-selected";
    if (index === focusedValue) className += " focused";

    return (
      <div
        key={value}
        data-value={value}
        className={className}
        /*  onMouseOver={this.onHoverOption} */
        onClick={this.onClickOption}
      >
        {/* {multiple ? ( */}
        <Grid className="optionGrid" container justify="space-between" >
          <Grid item>
            <span className={`${selected ? "selected-textsInSelect" : "textsInSelect"}`}>
              {value}
            </span>
          </Grid>
          <Grid
            item
            style={{
              marginRight: "5px",
              width: "15px",
              minWidth:"15px !important"
            }}
          >
            <span className="tick">{selected ? <Check /> : null}</span>
          </Grid>
        </Grid>
        {/*    ) : null} */}
      </div>
    );
  }

  render() {
    const { label } = this.props;
    const { isOpen } = this.state;

    return (
      <div
        className="select"
        tabIndex="0"
        /*   onFocus={this.onFocus} */
        onBlur={this.onBlur}
      /*   onKeyDown={this.onKeyDown} */
      >
        <label className="label">{label}</label>
        <div
          className={`selection custom-drop ${this.state.isOpen?"radius-bottom0":""}`}
          // style={{ border: `1px solid ${localStorage.getItem("clientcolor")}` }}
          onClick={this.onClick}
        >
          {this.renderValues()}
          <div className="dynamiclinks arrow">
            {/* <div className="triangle">
              <span className=" triangle-4" />
              <span className=" triangle-5" />
            </div> */}
          </div>
        </div>
        {this.renderOptions()}
      </div>
    );
  }
}




const Check = () => (
  <img src={require("../../assets/images/ok.svg")} />
);

export default Select;
