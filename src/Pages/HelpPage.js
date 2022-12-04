//Icons
import * as Icon from "react-bootstrap-icons";

function HelpPage() {
  return (
    <>
      <div className="stick-top aler alert-warning p-3 fs-5" role="alert">
        <Icon.ExclamationTriangleFill className="me-2" />
        <strong>Disclaimer: </strong>
        This site is for educational purposes only!!<br/>
        No data used on this website is ever saved in any way.
      </div>
      <div className="d-flex flex-column mt-3 h-75 w-100 p-2">
        <h1 className="text-center">SIM CARD REGISTRATION</h1>
        <hr />
        <div className="d-flex justify-content-end w-100">
          <form className="form w-50 me-3">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="seach"
                aria-describedby="search"
              />
              <span className="input-group-text" id="search">
                <Icon.Search />
              </span>
            </div>
          </form>
        </div>
        <div className="d-flex flex-row h-100">
          <div className="d-flex flex-column justify-content-center align-items-center h-100 w-25 border-end border-2 fs-4">
            <ul>
              <li className="mb-2">How to...</li>
              <li className="mb-2">How to...</li>
              <li className="mb-2">How to...</li>
              <li className="mb-2">How to...</li>
              <li className="mb-2">About</li>
            </ul>
          </div>
          <div className="w-100 ps-3">
            <p className="fs-4 mt-2">Developer:</p>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="w-50 d-flex justify-content-center">
                <img
                  className="rounded-circle"
                  src="https://scontent.fcrk1-4.fna.fbcdn.net/v/t39.30808-6/311788795_101176979457456_4643840606214328847_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeElupZJKohjd5ewDhTS7Aw4jcWnja7On12NxaeNrs6fXdQR0b5IPx8vgsXYoBGpkH9D8TgeNAHQnjuUzYeWx8Kq&_nc_ohc=HnPhvEBCgeAAX-BpNhG&_nc_ht=scontent.fcrk1-4.fna&oh=00_AfBW_a7El-xVxtnMOecRMm8OuiyGRx8DFf5jLhBtSAz9_Q&oe=63666E44"
                  width="250px"
                  alt="#"
                />
              </div>
              <p className="fs-3 m-0">Ian Krezelvent S. Agtarap</p>
              <a
                type="button"
                className="btn btn-primary"
                href="mailto:agtarapian0@gmail.com"
              >
                <Icon.Send className="me-2"/>
                Send me Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HelpPage;
