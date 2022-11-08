import React from "react";
import { fireEvent, render } from "@testing-library/react";
import FormScreen from "../src/screens/FormScreen/FormScreen";

describe('detail screen', () => {
    it('press to add button', () => {
        const navigation = {navigate: () => {}}
        spyOn(navigation, 'navigate')

        const page = render(<FormScreen/>)

        const addButton = page.getByTestId('addButton')

        fireEvent.press(addButton)
    })
})