export const viewBoxFadeIn = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 2
        },
    },
};

export const treeAnimation = {
    hidden: {
        opacity: 0,
        x: 0,
    },
    visible: {
        opacity: 1,
        x: [0, -10, 10, 0],
        transition: {
            opacity: {
                duration: 3,
            },
            x: {
                duration: 6,
                delay: 3.5,
                repeat: Infinity,
                repeatDelay: 2,
            },
            ease: "easeInOut",
        }
    }
};

export const skillCardsAnimation = {
    hidden: {
        opacity: 0,
        x: -100,
        y: -80,
    },
    visible: {
        opacity: 1,
        x: [0, 80, 0, 50, 0],
        y: 0,
        transition: {
            duration: 3,
            ease: "easeInOut",
        },
    },
};