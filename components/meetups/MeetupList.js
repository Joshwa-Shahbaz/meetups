import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

function MeetupList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups && props.meetups.length > 0 ? (
        props.meetups.map((item) => (
          <MeetupItem
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            address={item.address}
          />
        ))
      ) : (
        <p className={classes.error}>No data to show</p>
      )}
    </ul>
  );
}

export default MeetupList;
