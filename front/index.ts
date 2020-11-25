const sendButton = document.getElementById("sendButton");

if (sendButton === null) {
    throw new Error("sendButton not found");
}

type R = {
    checked: boolean;
    value: string;
};

sendButton.addEventListener("click", async () => {
    // const preWork = document.getElementsByName("work");
    const preWork: NodeListOf<HTMLInputElement> = document.querySelectorAll<HTMLInputElement>('input[name="work"]');

    const preWorkArray: HTMLInputElement[] = Array.from(preWork);

    const work: R[] = preWorkArray.map((element: HTMLInputElement) => {
        return {
            checked: element.checked,
            value: element.value,
        };
    });

    // const preDestination = document.getElementsByName("destination");
    const preDestination = document.querySelectorAll<HTMLInputElement>('input[name="destination"]');
    const preDestinationArray = Array.from(preDestination);
    const destination: R[] = preDestinationArray.map(({ checked, value }) => ({checked, value}));

    const result = {
        work,
        destination,
    };
    const res = await fetch("/sendButton", {
        method: "POST",
        body: JSON.stringify(result),
    });
    // console.log(res);
    // const body = await res.text();
    // console.log(body);
});
