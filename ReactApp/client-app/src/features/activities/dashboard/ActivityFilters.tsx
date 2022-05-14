import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function ActivityFilters()
{
    return (
        <>
          <Menu vertical size="large" style={{width:'100%'}}>
            <Header icon='filter' attached color="teal" content='Filter'></Header>
            <Menu.Item content="All activities"></Menu.Item>
            <Menu.Item content="I'am going"></Menu.Item>
            <Menu.Item content="I'am hosting"></Menu.Item>
          </Menu>
          <Calendar></Calendar>
        </>
    )
}