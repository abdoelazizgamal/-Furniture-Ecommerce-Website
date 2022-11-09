import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

const FooterLinks = ({ title, list, paths }) => {
  return (
    <>
      <div className="footer__quick-links">
        <h4 className="quick__links-title">{title}</h4>
        <ListGroup className="mb-3">
          {list?.map((item, index) => (
            <ListGroupItem className="ps-0 border-0" key={index}>
              <Link to={`${paths && paths[index] ? paths[index] : ""} `}>
                {item}
              </Link>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    </>
  );
};

export default FooterLinks;
