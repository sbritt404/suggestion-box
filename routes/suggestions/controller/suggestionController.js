const Suggestion = require('../model/Suggestion')

const getAllSuggestions = async (req, res) => {
    try {
        const suggestions = await Suggestion.find({})
        res.json({message:"Suggestions found.", payload: suggestions})
    } catch (error) {
        res.status(500).json({message: "Error", error})
    }
}

const getSingleSuggestion = async (req, res) => {
    try {
        const suggestion = await Suggestion.findById(req.params.id)
        if (!suggestion){
            return res.status(404).json({message: 'Suggestion not found'})
        }
        res.json({message:"Suggestion found.", payload: suggestion})
    } catch (error) {
        res.status(500).json({message: "Error", error})
    }
}

const createSuggestion = async (req, res) => {
    const { title, author, suggestion, anonymous} = req.body
    const newSuggestion = new Suggestion({ title, author, suggestion, anonymous})
    try {
        const savedSuggestion = await newSuggestion.save()
        res.json({message: "Suggestion created", payload: savedSuggestion})
    } catch (error) {
        res.status(500).json({message: "Error", error})
    }
}

const updateSuggestion = async (req, res) => {
    try {
        const updatedSuggestion = await Suggestion.findByIdAndUpdate(
            req.params.id,
            { title: req.body.title, suggestion: req.body.suggestion },
            { new: true }
        );
        if (!updatedSuggestion) {
            return res.status(404).json({ message: 'Suggestion not found' });
        }
        res.json({ message: "Suggestion updated.", payload: updatedSuggestion });
    } catch (error) {
        res.status(500).json({ message: "Error", error });
    }
}

const deleteSuggestion = async (req, res) => {
    try {
        const deletedSuggestion = await Suggestion.findByIdAndDelete(req.params.id);
        if (!deletedSuggestion) {
            return res.status(404).json({ message: 'Suggestion not found' });
        }
        res.json({ message: "Suggestion deleted." });
    } catch (error) {
        res.status(500).json({ message: "Error", error });
    }
}

const getSuggestionsByAuthor = async (req, res) => {
    
}

module.exports = { getAllSuggestions,
    getSingleSuggestion,
    createSuggestion,
    updateSuggestion,
    deleteSuggestion,
    getSuggestionsByAuthor}