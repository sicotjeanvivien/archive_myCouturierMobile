import * as React from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import {styles} from '../../assets/stylesCustom';
import { ConstEnv } from '../../ConstEnv';


export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {
        let { prestation } = this.props.route.params
        let { userToken } = this.props.route.params;
        console.log(userToken, ConstEnv.host + ConstEnv.prestationDetail + prestation.id);

        fetch(ConstEnv.host + ConstEnv.prestationDetail + prestation.id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': userToken,
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                this.setState({
                    isLoading: false,

                },
                    function () { });
            })
            .catch(error => {
                console.error(error);
            });

    }
    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            );
        } else {
            if (this.state) {
                return (
                    <ScrollView style={styles.scrollView}>
                        <View>
                            <Text></Text>
                        </View>
                        <Text>
                            detail presation
                        </Text>
                    </ScrollView>
                )
            } else {

                return (
                    <ScrollView style={styles.scrollView}>
                        <View>
                            <Text></Text>
                        </View>
                        <Text>
                            detail presation
                    </Text>
                    </ScrollView>
                )
            }
        }
    }
}