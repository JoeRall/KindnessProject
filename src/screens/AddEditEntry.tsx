import * as React from "react";
import { AsyncStorage } from "react-native";
import { Calendar, CalendarList } from "react-native-calendars";
import { Button, Text, Icon, Form, Item, Input, Spinner, View, H2 } from 'native-base';
import { NavigationScreenProps } from 'react-navigation';
import { Colors } from '../Theme';

interface AddEditEntryRouteProps {
  diaryId?: string;
}

interface AddEditEntryProps extends NavigationScreenProps {

}
interface AddEditEntryState {
  isLoading: boolean;
  diary?: IDiary;

}
//-- More Lifecyle Info: https://facebook.github.io/react/docs/react-component.html
class AddEditEntry extends React.Component<AddEditEntryProps, AddEditEntryState> {


  static defaultProps: Partial<AddEditEntryProps> = {
    //-- If you don't need default props, this static property can be deleted
  }

  /**
   *
   */
  constructor(props: AddEditEntryProps) {
    super(props);

    this.state = {
      isLoading: true,
    }
    this.getDiaryFromProps();
  }

  private async getDiaryFromProps() {
    try {
      const props: AddEditEntryRouteProps = this.props.navigation.state.params ? this.props.navigation.state.params : {};
      if (props.diaryId) {
        const local = await AsyncStorage.getItem(this.diaryKey(props.diaryId));

        if (local) {
          const diary = JSON.parse(local);
          this.setState({ diary, isLoading: false });
          return;
        }
      }
    } catch {

    }

    const d: IDiary = {
      id: Guid.newGuid(),
      isGoalOfTheDay: false,
    }
    await AsyncStorage.setItem(this.diaryKey(d.id), JSON.stringify(d));

    this.setState({ diary: d, isLoading: false });
  }

  diaryKey(id: string) {
    return `Diary_${id}`;
  }

  render() {
    const props: AddEditEntryRouteProps = this.props.navigation.state.params ? this.props.navigation.state.params : {};

    if (this.state.isLoading) {
      return (
        <View>
          <H2>{"Loading . . . "}</H2>
          <Spinner />
        </View>
      );
    }

    if (this.state.diary) {
      const today = new Date();
      return (
        <View>
          <H2>{`Hello ${this.state.diary.id}`}</H2>
          <CalendarList markedDates={{ "2018-04-01": { marked: true, dotColor: Colors.Primary } }} horizontal={true} pagingEnabled={true}  />
        </View>

      );
    }

    return <H2>{"An error occured"}</H2>;
  }
}

class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}





export default AddEditEntry;